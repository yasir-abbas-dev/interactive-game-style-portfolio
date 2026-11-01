import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { ArrowLeft, Mail, Linkedin, Instagram, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ExitScreenProps {
  isActive: boolean;
  onBack: () => void;
}

export function ExitScreen({ isActive, onBack }: ExitScreenProps) {
  const [showForm, setShowForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isActive) return;
    setShowForm(false);

    gsap.fromTo(
      containerRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
    );
  }, [isActive]);

  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [showForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    // Construct mailto URL with CC
    const mailtoUrl = `mailto:yasirgujjar16may2009@gmail.com?cc=king.of.dark.knight.99@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default mail client
    window.location.href = mailtoUrl;

    toast.success('Opening mail client...', {
      description: 'Please send the pre-filled email to complete the connection.',
    });
    setShowForm(false);
  };

  const socials = [
    { icon: Phone, label: 'WhatsApp', href: 'https://wa.me/923053480084' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/yasir-gujjar-9a896a38a/' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/mickey_x_toman?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { icon: Mail, label: 'Email', href: 'mailto:yasirgujjar16may2009@gmail.com' },
  ];

  return (
    <Screen isActive={isActive}>
      <button
        onClick={onBack}
        className="absolute top-16 md:top-20 left-4 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display tracking-wider text-sm md:text-base"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        BACK
      </button>

      <div ref={containerRef} className="flex flex-col items-center gap-6 md:gap-8 px-4 max-w-xl w-full pt-8 md:pt-0">
        {!showForm ? (
          <>
            <h2 className="font-display text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] text-primary glow-text text-center">
              DO YOU WANT TO<br />CONNECT?
            </h2>

            <p className="text-muted-foreground text-center max-w-sm text-sm md:text-base">
              Want to work together or discuss a project? Feel free to connect with me.
            </p>

            <div className="flex gap-4 md:gap-6 mt-2 md:mt-4">
              <Button
                onClick={() => setShowForm(true)}
                className="font-display text-base md:text-lg tracking-wider px-6 md:px-8 py-4 md:py-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                YES
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="font-display text-base md:text-lg tracking-wider px-6 md:px-8 py-4 md:py-6 border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
              >
                NO
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded border border-border bg-card hover:border-primary hover:text-primary transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
            <h2 className="font-display text-2xl tracking-[0.2em] text-primary glow-text text-center mb-8">
              SEND MESSAGE
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-display">NAME</label>
                <Input
                  required
                  name="name"
                  placeholder="Enter your name"
                  className="bg-card border-border focus:border-primary font-sans"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-display">EMAIL</label>
                <Input
                  type="email"
                  required
                  name="email"
                  placeholder="Enter your email"
                  className="bg-card border-border focus:border-primary font-sans"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-display">MESSAGE</label>
                <Textarea
                  required
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                  className="bg-card border-border focus:border-primary font-sans resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                type="submit"
                className="font-display tracking-wider px-8 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                TRANSMIT
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="font-display tracking-wider px-8 border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
              >
                CANCEL
              </Button>
            </div>
          </form>
        )}

        <p className="text-xs md:text-sm text-muted-foreground mt-6 md:mt-8">
          Press <span className="text-primary font-display">ESC</span> to return
        </p>
      </div>
    </Screen>
  );
}
