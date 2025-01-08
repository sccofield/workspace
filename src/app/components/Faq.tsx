'use client'; // Enables interactivity

import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I book a workspace?',
      answer:
        'Booking is simple. Choose a subscription plan, log in to your account, and select an available workspace from the app.',
    },
    {
      question: 'What happens if I don’t use all my days in a Flex plan?',
      answer:
        'Unused days will expire once the validity period ends (10 days for Flex Weekly, 40 days for Flex Monthly).',
    },
    {
      question: 'Do you offer private offices?',
      answer:
        'Yes, we offer private offices for an additional fee. Contact us for availability and pricing.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer:
        'Subscriptions can be canceled at any time, but unused days are non-refundable. Contact support for help.',
    },
    {
      question: 'Is there customer support available?',
      answer:
        'Absolutely! Our support team is available via email and chat to assist with any issues you face.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Have questions? We’ve got answers.
        </p>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <span className="text-gray-500 text-2xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {/* Answer */}
              {activeIndex === index && (
                <p className="mt-2 text-gray-600 text-left">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
