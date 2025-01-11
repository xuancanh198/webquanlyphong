<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f7;
            color: #51545e;
        }

        .email-wrapper {
            width: 100%;
            padding: 20px;
            background-color: #f4f4f7;
        }

        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .email-header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            text-align: center;
        }

        .email-body h2 {
            color: #333333;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
            display: inline-block;
            padding: 10px 20px;
            border: 2px dashed #4CAF50;
            border-radius: 5px;
        }

        .email-footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #888888;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <h1>{{ config('app.name') }}</h1>
            </div>
            <div class="email-body">
                <h2>@lang('textBlade.greeting')</h2>
                <em>@lang('textBlade.otp_message')</em>
                <div class="otp-code">{{ $otp }}</div>
                <p>@lang('textBlade.otp_expiry')</p>
            </div>
        </div>
        <div class="email-footer">
            &copy; {{ date('Y') }} {{ config('app.name') }}.
        </div>
    </div>
</body>

</html>