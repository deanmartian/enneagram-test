# Instruksjoner for Marit Reiersgård sitt bilde

## Hvordan legge til bildet

1. **Bildefil**: Ta bildet du har og gi det navnet `marit-reiersgard.jpg`

2. **Plassering**: Legg bildet i mappen `public/images/`
   ```
   enneagram-test/
   └── public/
       └── images/
           └── marit-reiersgard.jpg  <-- Her!
   ```

3. **Anbefalte spesifikasjoner**:
   - **Format**: JPG eller PNG
   - **Størrelse**: Minst 400x400 piksler (kvadratisk)
   - **Filstørrelse**: Under 200KB for rask lasting
   - **Kvalitet**: Høy oppløsning, tydelig ansikt
   - **Stil**: Profesjonelt profilbilde

## Hvor bildet vises

Bildet vil automatisk vises på:

### 1. Landingssiden
- Stor rund profil (128x128px) i ekspert-seksjonen
- Sammen med sitater og credentials

### 2. Resultatsiden
- Mindre rund profil (64x64px) i ekspert-boksen
- Ved siden av ekspert-kommentarer

## Fallback

Hvis bildet ikke finnes eller ikke laster, vises initialer "MR" som backup.

## Juridiske hensyn

⚠️ **VIKTIG**: Sørg for at du har:
- Tillatelse fra Marit Reiersgård til å bruke bildet
- Rettigheter til bildet (tatt av deg eller med fotografens tillatelse)
- Godkjenning for bruk i kommersielle sammenhenger

## Teknisk implementering

Bildet er allerede integrert i koden med:
- Next.js Image-komponenten for optimalisering
- Automatisk responsiv skalering
- Lazy loading for bedre ytelse
- Fallback til initialer hvis bildet mangler

Når du legger bildet i `public/images/marit-reiersgard.jpg` vil det automatisk vises på nettsiden!
