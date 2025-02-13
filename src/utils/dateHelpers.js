/**
 * Helper functions for formatting ISO 8601 date/time strings (single or ranges)
 * and computing relative time differences.
 */

/**
 * Returns the ordinal suffix for a given day number.
 * @param {number} day - The day of the month.
 * @returns {string} The ordinal suffix.
 */
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

/**
 * Formats the date part of a Date object.
 * Example: "1st Jan 2026"
 * @param {Date} date - The date object.
 * @returns {string} The formatted date string.
 */
function formatDatePart(date) {
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}${suffix} ${month} ${year}`;
}

/**
 * Formats the time part of a Date object.
 * Example: "10am" or "10:15am"
 * @param {Date} date - The date object.
 * @returns {string} The formatted time string.
 */
function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    return minutes > 0
        ? `${displayHours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`
        : `${displayHours}${ampm}`;
}

/**
 * Formats an ISO date/time string or a range into a user-friendly format.
 * If a range is provided, and both dates fall on the same day, the date is shown once,
 * followed by the start and end times.
 *
 * Examples:
 *   "2026-01-01T10:00:00" → "1st Jan 2026 | 10am"
 *   "2026-01-01T10:00:00/2026-01-01T12:00:00" → "1st Jan 2026 | 10am - 12pm"
 *   "2026-01-01T22:00:00/2026-01-02T01:00:00" → "1st Jan 2026 | 10pm - 2nd Jan 2026 | 1am"
 *
 * @param {string} dateTimeStr - An ISO 8601 string or a datetime range separated by a slash.
 * @returns {string} The formatted date/time string.
 */
export function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return "";

    let startStr, endStr;
    if (dateTimeStr.includes('/')) {
        [startStr, endStr] = dateTimeStr.split('/');
    } else {
        startStr = dateTimeStr;
        endStr = null;
    }

    const startDate = new Date(startStr);
    if (isNaN(startDate.getTime())) {
        return "Invalid date";
    }

    const formattedStart = `${formatDatePart(startDate)} | ${formatTime(startDate)}`;

    if (endStr) {
        const endDate = new Date(endStr);
        if (isNaN(endDate.getTime())) {
            return "Invalid date";
        }
        // Check if both dates are on the same day.
        if (startDate.toDateString() === endDate.toDateString()) {
            return `${formatDatePart(startDate)} | ${formatTime(startDate)} - ${formatTime(endDate)}`;
        } else {
            return `${formattedStart} - ${formatDatePart(endDate)} | ${formatTime(endDate)}`;
        }
    }

    return formattedStart;
}

/**
 * Computes the relative time difference between now and a given ISO date/time string (or range).
 * For ranges, the start date/time is used for the calculation.
 *
 * Examples: 
 *    "In 5 minutes", "2 hours ago", "Happening now"
 *
 * @param {string} dateTimeStr - An ISO 8601 string or a datetime range.
 * @returns {string} A string representing the relative time difference.
 */
export function getDifference(dateTimeStr) {
    if (!dateTimeStr) return "";

    const compareStr = dateTimeStr.includes('/') ? dateTimeStr.split('/')[0] : dateTimeStr;
    const eventDate = new Date(compareStr);
    if (isNaN(eventDate.getTime())) {
        return "Invalid date";
    }

    const now = new Date();
    const diffInMs = eventDate - now;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (diffInMs < 0) {
        const absMinutes = Math.abs(diffInMinutes);
        const absHours = Math.abs(diffInHours);
        const absDays = Math.abs(diffInDays);
        const absMonths = Math.abs(diffInMonths);
        const absYears = Math.abs(diffInYears);
        if (absMinutes < 60) return `${absMinutes} minutes ago`;
        if (absHours < 24) return `${absHours} hours ago`;
        if (absDays < 30) return `${absDays} days ago`;
        if (absMonths < 12) return `${absMonths} months ago`;
        return `${absYears} years ago`;
    } else {
        if (diffInMinutes < 1) return "Happening now";
        if (diffInMinutes < 60) return `In ${diffInMinutes} minutes`;
        if (diffInHours < 24) return `In ${diffInHours} hours`;
        if (diffInDays < 30) return `In ${diffInDays} days`;
        if (diffInMonths < 12) return `In ${diffInMonths} months`;
        return `In ${diffInYears} years`;
    }
} 