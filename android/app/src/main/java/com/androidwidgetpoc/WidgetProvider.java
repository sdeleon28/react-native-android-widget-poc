package com.androidwidgetpoc;

import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;

/**
 * Hello there, Android developer who already knows this stuff! You're going to hate how heavily commented this class
 * is.
 * Hello there, RN developer. You're going to love how heavily commented this class is.
 */
public class WidgetProvider extends AppWidgetProvider {
    private static final String WIDGET_TASK = "com.androidwidgetpoc.WIDGET_TASK";

    /*
    * When enabled on screen, let the BackgroundTaskBridge
    * manipulate it from javascript
    */
    @Override
    public void onEnabled(Context context) {
        Log.d("WIDGET_PROVIDER", "En onEnabled");
        Intent serviceIntent = new Intent(context, BackgroundTask.class);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }

    /**
     * This is called when the user presses something on the widget.
     *
     * incomingIntent is the object that represents the touch event.
     */
    @Override
    public void onReceive(final Context context, final Intent incomingIntent) {
        super.onReceive(context, incomingIntent);

        if (!incomingIntent.getAction().startsWith("com.androidwidgetpoc.CHARM")) {
            return;
        }

        Intent serviceIntent = new Intent(context, BackgroundTask.class);
        // incomingIntent has what they call "extras" in the Android world.
        // In this context, that's basically a bundle of data representing the touch event.
        // Call serviceIntent.putExtras to send that data over to the js task.
        serviceIntent.putExtras(incomingIntent);
        context.startService(serviceIntent);
    }
}
