import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface Review {
  id: string;
  platform: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  location: string;
  date: string;
  serviceType: string;
  source?: 'api' | 'csv' | 'default';
}

export async function GET() {
  try {
    // Read the HomeAdvisor CSV file
    const csvPath = path.join(process.cwd(), 'public', 'data', 'reviewsha.csv');
    let homeAdvisorReviews: Review[] = [];

    try {
      const fileContents = await fs.readFile(csvPath, 'utf-8');
      
      // Parse CSV data
      const records = parse(fileContents, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      // Transform HomeAdvisor reviews
      homeAdvisorReviews = records.map((record: any) => ({
        id: record.id || Math.random().toString(36).substr(2, 9),
        platform: 'HomeAdvisor',
        rating: parseFloat(record.Rating) || 5,
        reviewText: record['Review Text'] || '',
        reviewerName: record['Reviewer Name'] || 'Anonymous',
        location: record.Location || '',
        date: record.Date || new Date().toISOString(),
        serviceType: record['Service Type'] || 'Window Repair'
      }));
    } catch (error) {
      console.error('Error reading HomeAdvisor CSV file:', error);
      // Continue with empty HomeAdvisor reviews if file doesn't exist or is invalid
    }

    // Read the Thumbtack CSV file
    const thumbtackCsvPath = path.join(process.cwd(), 'public', 'data', 'reviewstt.csv');
    let thumbtackReviews: Review[] = [];

    try {
      const fileContents = await fs.readFile(thumbtackCsvPath, 'utf-8');
      
      // Parse CSV data
      const records = parse(fileContents, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      // Transform Thumbtack reviews
      thumbtackReviews = records.map((record: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        platform: 'Thumbtack',
        rating: parseFloat(record.Rating) || 5,
        reviewText: record.Review || '',
        reviewerName: record.Name || 'Anonymous',
        location: record.Location || '',
        date: record.Date || new Date().toISOString(),
        serviceType: record['Service Type'] || 'Window Repair'
      }));
    } catch (error) {
      console.error('Error reading Thumbtack CSV file:', error);
      // Continue with empty Thumbtack reviews if file doesn't exist or is invalid
    }

    // Get both API and CSV Google reviews
    let googleReviews: Review[] = [];

    // 1. Fetch from Google Places API
    try {
      const placeId = 'ChIJOdzghZ3xtokRrt9-myMgPOM';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&reviews_sort=newest&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Google reviews');
      }

      const data = await response.json();
      
      if (data.status === 'OK' && data.result && data.result.reviews) {
        const apiReviews = data.result.reviews.map((review: any) => ({
          id: review.time.toString(),
          platform: 'Google',
          rating: review.rating,
          reviewText: review.text,
          reviewerName: review.author_name,
          location: '',
          date: new Date(review.time * 1000).toISOString(),
          serviceType: 'Window Repair',
          source: 'api' as const
        }));
        googleReviews.push(...apiReviews);
      }
    } catch (error) {
      console.error('Error fetching Google API reviews:', error);
      // Continue with just CSV reviews if API fails
    }

    // 2. Read from CSV file
    try {
      const googleCsvPath = path.join(process.cwd(), 'public', 'data', 'reviewsgo.csv');
      const fileContents = await fs.readFile(googleCsvPath, 'utf-8');
      
      const records = parse(fileContents, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      const csvReviews = records.map((record: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        platform: 'Google',
        rating: parseFloat(record.Rating) || 5,
        reviewText: record.Review || '',
        reviewerName: record.Name || 'Anonymous',
        location: '',
        date: record.Date || new Date().toISOString(),
        serviceType: 'Window Repair',
        source: 'csv' as const
      }));

      // Filter out any CSV reviews that might be duplicates of API reviews
      // by comparing review text and reviewer name
      const existingReviews = new Set(googleReviews.map((r: Review) => `${r.reviewerName}-${r.reviewText}`));
      const uniqueCsvReviews = csvReviews.filter((r: Review) => !existingReviews.has(`${r.reviewerName}-${r.reviewText}`));
      
      googleReviews.push(...uniqueCsvReviews);
    } catch (error) {
      console.error('Error reading Google CSV file:', error);
      // If both API and CSV fail, use a default review
      if (googleReviews.length === 0) {
        googleReviews = [{
          id: 'g1',
          platform: 'Google',
          rating: 4.9,
          reviewText: 'Default review text when both API and CSV fail',
          reviewerName: 'Anonymous',
          location: 'Fredericksburg, VA',
          date: new Date().toISOString(),
          serviceType: 'Window Repair',
          source: 'default' as const
        }];
      }
    }

    // Combine all reviews
    const allReviews = [
      ...homeAdvisorReviews,
      ...googleReviews,
      ...thumbtackReviews
    ];

    // Sort reviews by date (most recent first)
    allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(allReviews);
  } catch (error) {
    console.error('Error processing reviews:', error);
    // Return empty array instead of error to prevent client-side issues
    return NextResponse.json([]);
  }
} 