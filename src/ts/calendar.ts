'use strict';

import { CalendarFactory } from '../renderer/classes/CalendarFactory';
import { applyTheme } from '../renderer/themes';
import { searchLeaveByElement } from '../renderer/notification-channel';

// Global values for calendar
let calendar: any = undefined;

function setupCalendar(preferences: any): void {
    window.rendererApi.getLanguageDataPromise().then(async (languageData: any) => {
        calendar = await CalendarFactory.getInstance(preferences, languageData, calendar);
        applyTheme(preferences.theme);
    });
}

/*
 * Reload the calendar upon request from main
 */
window.calendarApi.handleCalendarReload(async () => {
    await calendar.reload();
});

/*
 * Update the calendar after a day has passed
 */
window.calendarApi.handleRefreshOnDayChange((event: any, oldDate: any, oldMonth: any, oldYear: any) => {
    calendar.refreshOnDayChange(oldDate, oldMonth, oldYear);
});

/*
 * Get notified when preferences have been updated.
 */
window.calendarApi.handlePreferencesSaved((event: any, prefs: any) => {
    setupCalendar(prefs);
});

/*
 * Get notified when waivers get updated.
 */
window.calendarApi.handleWaiverSaved(async () => {
    await calendar.loadInternalWaiveStore();
    calendar.redraw();
});

/*
 * Punch the date and time as requested by user.
 */
window.calendarApi.handlePunchDate(() => {
    calendar.punchDate();
});

/*
 * Reload theme.
 */
window.calendarApi.handleThemeChange(async (event: any, theme: any) => {
    applyTheme(theme);
});

/*
 * Returns value of "leave by" for notifications.
 */
window.calendarApi.handleLeaveBy(searchLeaveByElement);

// On page load, create the calendar and setup notification
$(() => {
    const preferences = window.rendererApi.getOriginalUserPreferences();
    requestAnimationFrame(() => {
        setupCalendar(preferences);
        requestAnimationFrame(() => {
            setTimeout(() => {
                window.rendererApi.notifyWindowReadyToShow();
            }, 100);
        });
    });
});