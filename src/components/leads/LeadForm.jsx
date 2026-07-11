import React, { useState } from 'react';
import PropTypes from 'prop-types';

// CRM Options constants
const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

/**
 * LeadForm - Form component to create a new lead or edit an existing one.
 * Displays inputs for name, company, email, phone, status, and source, with validation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.initialData] - Optional initial values for editing mode
 * @param {Function} props.onSubmit - Submission callback receiving form data
 * @param {Function} props.onCancel - Cancellation callback to close form
 * @returns {React.ReactElement} The rendered LeadForm component
 */
const LeadForm = ({ initialData, onSubmit, onCancel }) => {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    status: initialData?.status || 'New',
    source: initialData?.source || 'Website',
    value: initialData?.value !== undefined ? initialData.value : '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState({});

  /**
   * Field change handler. Updates specific field in state and clears error if active.
   *
   * @param {string} name - Form field key
   * @param {string} value - User entered input value
   */
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  /**
   * Validate required fields (Name, Company, Email) before submission.
   *
   * @returns {boolean} True if form inputs are valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Lead name is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Form submission handler. Validates data, and propagates it upward if valid.
   *
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        // Trim inputs to clean trailing whitespaces
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        value: formData.value !== '' ? parseFloat(formData.value) : 0,
        notes: formData.notes.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4" id="form-dialog-title">
        {isEditMode ? 'Edit Lead Profile' : 'Create New Lead'}
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        {isEditMode ? 'Modify details of the existing lead below.' : 'Add a new contact to your lead pipeline database.'} Fields marked with * are required.
      </p>

      {/* Name Input */}
      <div>
        <label htmlFor="lead-name" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          Lead Name *
        </label>
        <input
          id="lead-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Alice Smith"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'lead-name-error' : undefined}
          className={`w-full text-sm px-3.5 py-2.5 bg-white dark:bg-gray-850 text-gray-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-150 ${
            errors.name
              ? 'border-danger focus:ring-danger/25 bg-red-50/10'
              : 'border-gray-250 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
          }`}
        />
        {errors.name && (
          <p id="lead-name-error" className="text-xs text-danger font-medium mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Company Input */}
      <div>
        <label htmlFor="lead-company" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
          Company *
        </label>
        <input
          id="lead-company"
          type="text"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="e.g. TechNova Inc."
          aria-required="true"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'lead-company-error' : undefined}
          className={`w-full text-sm px-3.5 py-2.5 bg-white dark:bg-gray-850 text-gray-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-150 ${
            errors.company
              ? 'border-danger focus:ring-danger/25 bg-red-50/10'
              : 'border-gray-250 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
          }`}
        />
        {errors.company && (
          <p id="lead-company-error" className="text-xs text-danger font-medium mt-1">
            {errors.company}
          </p>
        )}
      </div>

      {/* Grid: Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label htmlFor="lead-email" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            id="lead-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="name@company.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'lead-email-error' : undefined}
            className={`w-full text-sm px-3.5 py-2.5 bg-white dark:bg-gray-850 text-gray-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 transition-all duration-150 ${
              errors.email
                ? 'border-danger focus:ring-danger/25 bg-red-50/10'
                : 'border-gray-250 dark:border-gray-700 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.email && (
            <p id="lead-email-error" className="text-xs text-danger font-medium mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full text-sm px-3.5 py-2.5 bg-white dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-250 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
          />
        </div>
      </div>

      {/* Grid: Status & Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status */}
        <div>
          <label htmlFor="lead-status" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Lead Status
          </label>
          <select
            id="lead-status"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full text-sm px-3.5 py-2.5 border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all duration-150"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Source */}
        <div>
          <label htmlFor="lead-source" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Lead Source
          </label>
          <select
            id="lead-source"
            value={formData.source}
            onChange={(e) => handleChange('source', e.target.value)}
            className="w-full text-sm px-3.5 py-2.5 border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-850 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all duration-150"
          >
            {SOURCE_OPTIONS.map((source) => (
              <option key={source} value={source} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Value & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Value */}
        <div className="md:col-span-1">
          <label htmlFor="lead-value" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Deal Value ($)
          </label>
          <input
            id="lead-value"
            type="number"
            min="0"
            value={formData.value}
            onChange={(e) => handleChange('value', e.target.value)}
            placeholder="e.g. 5000"
            className="w-full text-sm px-3.5 py-2.5 bg-white dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-250 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label htmlFor="lead-notes" className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Notes
          </label>
          <input
            id="lead-notes"
            type="text"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="e.g. Needs pricing details"
            className="w-full text-sm px-3.5 py-2.5 bg-white dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-250 dark:border-gray-700 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4.5 py-2.5 min-h-[44px] border border-gray-200 dark:border-gray-700 text-sm font-semibold rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-155 active:scale-98 flex items-center justify-center"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 min-h-[44px] bg-primary hover:bg-primary/95 text-white text-sm font-semibold rounded-lg shadow-sm shadow-primary/20 hover:shadow-md transition-all duration-155 cursor-pointer active:scale-98 flex items-center justify-center"
        >
          {isEditMode ? 'Save Changes' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
};

LeadForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    status: PropTypes.string,
    source: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    notes: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LeadForm;
