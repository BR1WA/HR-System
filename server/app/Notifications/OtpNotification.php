<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\App;
use Ichtrojan\Otp\Otp;

class OtpNotification extends Notification
{
    use Queueable;
    public $message;
    public $subject;
    public $fromMail;
    public $mailer;
    public $otp;
    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = "use this code to authenticate";
        $this->subject = "Otp Code";
        $this->fromMail = "salaheddinezouitni00@.com";
        $this->mailer="smtp";
        $this->otp=new Otp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via( $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail( $notifiable): MailMessage
    {
        $otp = $this->otp->generate($notifiable->email,'numeric', 6, 60);
        return (new MailMessage)
                    ->mailer($this->mailer)
                    ->subject($this->subject)
                    ->greeting('Hello !')
                    ->line($this->message)
                    ->line("Otp code: ". $otp->token);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray( $notifiable): array
    {
        return [
            //
        ];
    }
}