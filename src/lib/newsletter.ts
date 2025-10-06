import { ApiResponse } from '@/types';
import { saveNewsletterSubscription } from './database';

// Resend client setup (placeholder for when API key is added)
import type { Resend } from 'resend';

const resendClient: Resend | null = null;

// Initialize Resend client when API key is available
export function initializeResend() {
  // TODO: Initialize Resend client with API key
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // resendClient = resend;
  console.log('Resend initialization placeholder - add API key');
}

// Email templates
const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Velkommen til Enneagram-nyhetsbrevet! 📧',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Velkommen til Enneagram-nyhetsbrevet!</h1>

        <p>Takk for at du meldte deg på vårt nyhetsbrev om Enneagram og personlighetsutvikling.</p>

        <p>Du vil motta:</p>
        <ul>
          <li>Dype innsikter om hver Enneagram-type</li>
          <li>Praktiske tips for personlig vekst</li>
          <li>Refleksjonsøvelser og selvutviklingsverktøy</li>
          <li>Oppdateringer om nye funksjoner i testen</li>
        </ul>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>💡 Første tips:</h3>
          <p>Husk at Enneagram-typen din er bare en start. Den virkelige verdien ligger i hvordan du bruker denne kunnskapen til å vokse og utvikle deg.</p>
        </div>

        <p>Med vennlig hilsen,<br>
        <strong>Marit Reiersgård</strong><br>
        Enneagram-ekspert</p>

        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          Du mottok denne e-posten fordi du meldte deg på vårt nyhetsbrev på enneagramtest.no.
          <a href="{{unsubscribeUrl}}" style="color: #2563eb;">Meld deg av her</a>
        </p>
      </div>
    `
  },

  confirmation: {
    subject: 'Bekreft ditt nyhetsbrev-abonnement',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Bekreft ditt abonnement</h1>

        <p>Hei!</p>
        <p>Du har meldt deg på nyhetsbrevet vårt om Enneagram og personlighetsutvikling.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="{{confirmUrl}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Bekreft abonnement
          </a>
        </div>

        <p>Hvis du ikke meldte deg på dette nyhetsbrevet, kan du trygt ignorere denne e-posten.</p>

        <p>Med vennlig hilsen,<br>
        Enneagramtest-teamet</p>
      </div>
    `
  },

  unsubscribe: {
    subject: 'Du er nå avmeldt fra nyhetsbrevet',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6b7280;">Avmeldt fra nyhetsbrevet</h1>

        <p>Du er nå avmeldt fra vårt nyhetsbrev om Enneagram og personlighetsutvikling.</p>

        <p>Vi savner deg allerede! Hvis du ombestemmer deg, kan du melde deg på igjen på <a href="https://enneagramtest.no">enneagramtest.no</a>.</p>

        <p>Takk for tiden du var med oss.</p>

        <p>Med vennlig hilsen,<br>
        Enneagramtest-teamet</p>
      </div>
    `
  }
};

// Subscribe to newsletter with double opt-in
export async function subscribeToNewsletter(
  email: string,
  sessionId?: string
): Promise<ApiResponse<{ requiresConfirmation: boolean }>> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Ugyldig e-postadresse'
      };
    }

    // Save to database
    const saveResult = await saveNewsletterSubscription(email, sessionId);
    if (!saveResult.success) {
      return {
        success: false,
        error: saveResult.error
      };
    }

    // Send confirmation email (mock for now)
    if (!resendClient) {
      console.log('Newsletter confirmation email (mock) sent to:', email);

      // In development, we'll skip the confirmation step
      return {
        success: true,
        data: { requiresConfirmation: false },
        message: 'Du er nå registrert for nyhetsbrevet!'
      };
    }

    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/confirm?token=${saveResult.data?.subscriptionId}`;

    // TODO: Send actual confirmation email with Resend
    // await resendClient.emails.send({
    //   from: 'noreply@enneagramtest.no',
    //   to: email,
    //   subject: EMAIL_TEMPLATES.confirmation.subject,
    //   html: EMAIL_TEMPLATES.confirmation.html.replace('{{confirmUrl}}', confirmUrl)
    // });

    return {
      success: true,
      data: { requiresConfirmation: true },
      message: 'Sjekk e-posten din for å bekrefte abonnementet'
    };

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      error: 'Kunne ikke melde deg på nyhetsbrevet'
    };
  }
}

// Confirm newsletter subscription
export async function confirmNewsletterSubscription(token: string): Promise<ApiResponse<void>> {
  try {
    if (!resendClient) {
      console.log('Newsletter confirmation (mock) for token:', token);
      return {
        success: true,
        message: 'Abonnement bekreftet! Velkommen til nyhetsbrevet.'
      };
    }

    // TODO: Update database to mark as confirmed
    // TODO: Send welcome email

    return {
      success: true,
      message: 'Abonnement bekreftet! Velkommen til nyhetsbrevet.'
    };

  } catch (error) {
    console.error('Error confirming newsletter subscription:', error);
    return {
      success: false,
      error: 'Kunne ikke bekrefte abonnement'
    };
  }
}

// Unsubscribe from newsletter
export async function unsubscribeFromNewsletter(token: string): Promise<ApiResponse<void>> {
  try {
    // TODO: Update database to mark as unsubscribed
    // TODO: Send confirmation email

    if (!resendClient) {
      console.log('Newsletter unsubscribe (mock) for token:', token);
      return {
        success: true,
        message: 'Du er nå avmeldt fra nyhetsbrevet'
      };
    }

    return {
      success: true,
      message: 'Du er nå avmeldt fra nyhetsbrevet'
    };

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return {
      success: false,
      error: 'Kunne ikke avmelde fra nyhetsbrevet'
    };
  }
}

// Send newsletter to all subscribers (admin function)
export async function sendNewsletter(
  subject: string,
  content: string,
  htmlContent?: string
): Promise<ApiResponse<{ sentCount: number }>> {
  try {
    if (!resendClient) {
      console.log('Newsletter broadcast (mock):', { subject, contentLength: content.length });
      return {
        success: true,
        data: { sentCount: 42 }, // Mock count
        message: 'Nyhetsbrev sendt til alle abonnenter'
      };
    }

    // TODO: Get all active subscribers from database
    // TODO: Send email to all subscribers
    // TODO: Track delivery and open rates

    return {
      success: true,
      data: { sentCount: 0 },
      message: 'Nyhetsbrev sendt til alle abonnenter'
    };

  } catch (error) {
    console.error('Error sending newsletter:', error);
    return {
      success: false,
      error: 'Kunne ikke sende nyhetsbrev'
    };
  }
}

// Newsletter content suggestions based on Enneagram types
export const NEWSLETTER_CONTENT_IDEAS = [
  {
    title: "Type 1: Perfeksjonistens dilemma",
    preview: "Hvordan Type 1 kan lære å omfavne 'godt nok' og finne fred med ufullkommenhet"
  },
  {
    title: "Type 2: Hjelperen som glemmer seg selv",
    preview: "Praktiske tips for Type 2 om å sette grenser og prioritere selvomsorg"
  },
  {
    title: "Type 3: Bak masken til Iverksetteren",
    preview: "Utforsk hvordan Type 3 kan koble seg til sin autentiske selv"
  },
  {
    title: "Type 4: Å finne skjønnhet i det vanlige",
    preview: "Hvordan Type 4 kan praktisere takknemlighet og finne mening i hverdagen"
  },
  {
    title: "Type 5: Å åpne døren til intimitet",
    preview: "Veiledning for Type 5 om å dele seg selv og bygge dypere relasjoner"
  },
  {
    title: "Type 6: Fra bekymring til tillit",
    preview: "Praktiske verktøy for Type 6 til å håndtere angst og bygge selvtillit"
  },
  {
    title: "Type 7: Dybde uten kjedsomhet",
    preview: "Hvordan Type 7 kan utvikle tålmodighet og finne mening i det enkle"
  },
  {
    title: "Type 8: Myk styrke og sårbar lederskap",
    preview: "Utforsk hvordan Type 8 kan lede med både kraft og empati"
  },
  {
    title: "Type 9: Å finne din egen stemme",
    preview: "Veiledning for Type 9 om å ta initiativ og uttrykke sine behov"
  }
];

// Email validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Environment setup instructions
export const RESEND_SETUP_INSTRUCTIONS = `
1. Gå til https://resend.com og opprett en konto
2. Verifiser domenet ditt (f.eks. enneagramtest.no)
3. Generer en API-nøkkel
4. Legg til følgende i .env.local:
   RESEND_API_KEY=re_your_api_key_here
   NEXT_PUBLIC_BASE_URL=https://your-domain.com

5. Installer Resend SDK:
   npm install resend

6. Oppdater denne filen for å bruke ekte Resend-client
`;

// TODO: Legg til Resend package: npm install resend
// TODO: Sett opp domeneverifisering i Resend
// TODO: Implementer ekte e-postgenerering med Resend
// TODO: Legg til unsubscribe-sider
// TODO: Implementer analytics for åpningsrater og klikkrater
// TODO: Legg til GDPR-compliant datalagring
