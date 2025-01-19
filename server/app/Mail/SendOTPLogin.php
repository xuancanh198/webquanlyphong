<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendOTPLogin extends Mailable
{
    use Queueable, SerializesModels;

    protected $email;
    protected $otp;
    public function __construct($email, $otp)
    {
        $this->email = $email;
        $this->otp = $otp;
    }

   
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: trans('textBlade.loginByEmailOTP'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'email.Blade.sendOTPLogin',
            with: [
                'otp' => $this->otp, 
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
