import { useState } from 'react';

export type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
  textConsent: 'yes' | 'no' | '';
  files: File[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  customerType: string;
  serviceType: string;
  urgency: string;
  issueType: string[];
  needByDate: string;
};

interface ContactConsentProps {
  onSubmit?: (data: FormData) => Promise<void>;
}

export default function ContactConsent({ onSubmit }: ContactConsentProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    textConsent: '',
    files: [],
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    customerType: '',
    serviceType: '',
    urgency: '',
    issueType: [],
    needByDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Convert files to base64
      const filesWithBase64 = await Promise.all(
        formData.files.map(async (file) => {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          return {
            name: file.name,
            type: file.type,
            base64: base64.split(',')[1] // Remove data URL prefix
          };
        })
      );

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'contact',
          files: filesWithBase64
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: {
            street: '',
            city: '',
            state: '',
            zip: ''
          },
          customerType: '',
          serviceType: '',
          urgency: '',
          issueType: [],
          message: '',
          files: [],
          textConsent: '',
          needByDate: '',
        });
      } else {
        setSubmitError(result.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-green-800">Thank You!</h3>
        <p className="mt-2 text-green-600">
          We've received your message and will contact you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <div>
      {submitError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name*
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm text-gray-900"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone*
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm text-gray-900"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm text-gray-900"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CD2028] focus:ring-[#CD2028] sm:text-sm text-gray-900"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        {/* Text Message Consent */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700">
              Do you agree to receive text messages from The Window Hospital Inc. sent from (540)-603-0088? Message frequency varies and may include (To provide and manage our services, to schedule and confirm appointments, to process payments and send invoices, to communicate with you regarding your inquiries and our services.) We do not sell your information this is only to communicate with The Window Hospital Inc. Message and data rates may apply. Reply STOP at any time to end or unsubscribe. For assistance, reply HELP or contact support at (540)-603-0088
            </p>
            <div className="mt-6 space-y-4">
              <label className="relative block">
                <input
                  type="radio"
                  name="textConsent"
                  value="yes"
                  checked={formData.textConsent === 'yes'}
                  onChange={(e) => setFormData({ ...formData, textConsent: e.target.value as 'yes' | 'no' })}
                  className="sr-only"
                  required
                />
                <div className={`cursor-pointer w-full p-4 border-2 rounded-lg transition-all duration-200 ${
                  formData.textConsent === 'yes' 
                    ? 'border-[#CD2028] bg-red-50 text-red-700' 
                    : 'border-gray-300 hover:border-red-300'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center ${
                      formData.textConsent === 'yes'
                        ? 'border-[#CD2028] bg-[#CD2028]'
                        : 'border-gray-400'
                    }`}>
                      {formData.textConsent === 'yes' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium">Yes, I agree to receive text messages from The Window Hospital Inc.</span>
                  </div>
                </div>
              </label>

              <label className="relative block">
                <input
                  type="radio"
                  name="textConsent"
                  value="no"
                  checked={formData.textConsent === 'no'}
                  onChange={(e) => setFormData({ ...formData, textConsent: e.target.value as 'yes' | 'no' })}
                  className="sr-only"
                  required
                />
                <div className={`cursor-pointer w-full p-4 border-2 rounded-lg transition-all duration-200 ${
                  formData.textConsent === 'no' 
                    ? 'border-[#CD2028] bg-red-50 text-red-700' 
                    : 'border-gray-300 hover:border-red-300'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center ${
                      formData.textConsent === 'no'
                        ? 'border-[#CD2028] bg-[#CD2028]'
                        : 'border-gray-400'
                    }`}>
                      {formData.textConsent === 'no' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium">No, I do not want to receive text messages from The Window Hospital Inc.</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#CD2028] hover:bg-[#B01B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CD2028]'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 