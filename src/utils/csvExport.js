/**
 * Utility function to convert an array of lead objects to a CSV string and trigger download.
 *
 * @param {Array<Object>} leads - Array of lead objects from state/context.
 */
export const exportLeadsToCSV = (leads) => {
  if (!Array.isArray(leads) || leads.length === 0) {
    throw new Error('No leads available to export.');
  }

  // Headers matching lead attributes
  const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Status', 'Source', 'Deal Value ($)', 'Created At'];

  // Helper to escape values that contain commas, double quotes, or newlines
  const escapeCSVField = (val) => {
    if (val === undefined || val === null) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvRows = [];
  
  // Add headers row
  csvRows.push(headers.join(','));

  // Add lead rows
  leads.forEach((lead) => {
    const row = [
      escapeCSVField(lead.id),
      escapeCSVField(lead.name),
      escapeCSVField(lead.company),
      escapeCSVField(lead.email),
      escapeCSVField(lead.phone),
      escapeCSVField(lead.status),
      escapeCSVField(lead.source),
      escapeCSVField(lead.value),
      escapeCSVField(lead.createdAt ? new Date(lead.createdAt).toISOString() : ''),
    ];
    csvRows.push(row.join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);

  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('download', `crm_leads_export_${dateStr}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default exportLeadsToCSV;
