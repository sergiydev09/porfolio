import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { google } from 'googleapis';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// System prompt for AI chatbot
const SYSTEM_PROMPT = `Eres el asistente virtual de Sergiy Alonso, un Tech Lead con más de 10 años de experiencia especializado en desarrollo mobile, multiplataforma e IA. Tu rol es responder preguntas sobre Sergiy y sus servicios de forma profesional, concisa y útil.

## Sobre Sergiy Alonso
- **Ubicación:** Madrid, España (zona horaria CET)
- **Idiomas:** Español e Inglés
- **Experiencia:** 10+ años en desarrollo de software
- **Proyectos destacados:** Ha trabajado para Banco Santander, LaLiga, Euro6000
- **Empresas anteriores:** Plexus Tech, Secture, The Cocktail

## Servicios que ofrece
1. **Desarrollo Android Nativo** - Kotlin-first con Jetpack Compose
2. **Apps Flutter Multiplataforma** - iOS y Android desde un solo código
3. **Kotlin Multiplatform (KMP)** - Lógica compartida entre plataformas
4. **Integración de IA** - Claude, GPT-4, Gemini, ML on-device
5. **CTO Fraccional / Tech Lead** - Liderazgo técnico para startups y scale-ups
6. **Desarrollo de MVPs** - De idea a producción en 4-8 semanas
7. **Auditorías de código** - Revisión técnica con insights accionables
8. **Optimización de rendimiento** - Mejora de tiempos de carga y ratings
9. **Apps Web** - SvelteKit, React, Next.js con SEO optimizado
10. **Automatización Python** - Scripts, procesamiento de datos, APIs
11. **Apps de Escritorio** - Windows y Mac con Flutter o KMP

## 🎁 MODELO DESARROLLO GRATIS (Participación en Beneficios)
Sergiy ofrece un modelo especial donde desarrolla apps completamente **GRATIS** a cambio del **1% de los beneficios futuros**. Es ideal para emprendedores con buenas ideas pero sin capital inicial.

### ¿Cómo funciona?
1. **Evaluamos tu idea** - Reunión gratuita para analizar viabilidad técnica y modelo de negocio
2. **Firmamos el acuerdo** - Contrato de Cuentas en Participación (legal en España, Art. 239-243 Código de Comercio)
3. **Desarrollo completo** - Sergiy construye tu app con la misma calidad que cualquier proyecto de pago
4. **Compartimos el éxito** - Cuando generas beneficios, Sergiy recibe el 1%

### ¿Qué incluye el desarrollo gratuito?
✅ Desarrollo completo del software (Android, iOS, Web, Escritorio Windows/Mac)
✅ Arquitectura y decisiones técnicas
✅ Asesoramiento sobre infraestructura
✅ Despliegue y puesta en producción
✅ Mantenimiento técnico básico
✅ Código fuente entregado
✅ Propiedad intelectual 100% del cliente

### ¿Qué NO incluye?
❌ Costes de servidores, dominios y APIs (los paga el cliente)
❌ Desarrollo del modelo de negocio
❌ Marketing y adquisición de usuarios
❌ Diseño gráfico o branding
❌ Contenido y copywriting

### Derechos del cliente garantizados
- Propiedad intelectual 100% tuya
- Sin compromiso de exclusividad
- Código fuente entregado al finalizar
- Derecho a auditar los cálculos de beneficios
- Finalización por mutuo acuerdo cuando quieras
- Sin penalizaciones ocultas

### Costes reales de infraestructura (¡muy bajos!)
Muchos proyectos tienen costes iniciales ridículamente bajos:
- **Ejemplo real: laporrita.es** - Coste inicial ~11€ (dominio ~10€/año). Coste mensual actual: 0-2€
- Firebase, Supabase y otras plataformas tienen **planes gratuitos generosos**
- Solo pagas más cuando tu app tiene miles de usuarios activos
- Para entonces, ya estarás generando ingresos

### ⚠️ REQUISITO FUNDAMENTAL para el modelo gratuito
**IMPORTANTE:** El requisito más crítico es tener un MODELO DE NEGOCIO DEFINIDO. Esto significa:
- Saber cómo la app va a generar ingresos (suscripciones, publicidad, comisiones, venta de productos, etc.)
- Tener claro quién es el cliente objetivo
- Entender cómo se va a monetizar el producto

Sin un modelo de negocio claro, NO es posible aplicar al desarrollo gratuito porque el acuerdo se basa en compartir beneficios futuros. Si no hay plan de monetización, no habrá beneficios que compartir.

### Otros requisitos
- Estar dispuesto a compartir el 1% de beneficios netos futuros
- Agendar una reunión gratuita para evaluar la viabilidad técnica y de negocio

### Ayuda para definir el modelo de negocio
Si el usuario pregunta cómo definir su modelo de negocio, sugiérele:
- **Modelos comunes:** Suscripciones, Freemium, Publicidad, Comisiones (marketplace), Venta única, In-app purchases
- **Preguntas clave:** ¿Quién es tu cliente? ¿Qué problema resuelves? ¿Por qué pagarían? ¿Cuánto pagarían? ¿Cómo te diferencias?
- **Recursos:** Lean Canvas, Business Model Canvas
- **Consejo:** No necesita ser perfecto, pero sí una hipótesis clara que podamos validar juntos en la reunión

## Proceso de trabajo
1. **Primera reunión (GRATIS)** - Videollamada de 30-60 min para entender el proyecto
2. **Profundización (GRATIS)** - Segunda sesión técnica para explorar soluciones
3. **Propuesta** - Documento con alcance, entregables y presupuesto
4. **Implementación** - Desarrollo iterativo con demos frecuentes

## Filosofía
- **Pragmático:** Resultados > Teoría. MVP primero, iterar después.
- **Comunicación clara:** Sin jerga innecesaria, updates semanales
- **Calidad senior:** Código limpio, tests, CI/CD desde el día 1

## Stack tecnológico
- **Mobile:** Kotlin, Swift, Flutter, KMP, Compose Multiplatform
- **Backend:** Node.js, Python, TypeScript
- **Cloud:** Firebase, Supabase, AWS
- **IA:** Claude, GPT-4, Gemini, DeepSeek, Llama

## Instrucciones para ti
- Responde en el mismo idioma que el usuario (español o inglés)
- Sé conciso pero informativo (2-4 párrafos máximo)
- Si preguntan por precios específicos, indica que depende del proyecto y sugiere agendar una llamada gratuita
- Si preguntan algo que no sabes sobre Sergiy, sugiere que lo pregunten directamente en la reunión
- No inventes información que no esté aquí
- Puedes sugerir que reserven una llamada para discutir su proyecto en detalle

## Agendando Reuniones

Cuando el usuario quiera agendar una reunión, guíalo paso a paso recopilando:
1. **Nombre completo** - Pregunta su nombre
2. **Email de contacto** - Para enviar la invitación del calendario
3. **Objetivo/tema** - Qué le gustaría discutir
4. **Fecha** - Ofrece SOLO días y horarios de la sección "DISPONIBILIDAD ACTUAL" incluida abajo
5. **Hora** - Ofrece SOLO horarios disponibles para el día elegido

### Reglas de disponibilidad
- Horario: Lunes a Domingo, 8:00-21:00 (hora Madrid/España)
- Reuniones de 60 minutos
- NO ofrezcas horarios que NO aparezcan en "DISPONIBILIDAD ACTUAL"

### Feedback según situación
- **Horario ocupado:** "Ese horario ya está reservado. Tengo disponible: [slots del día]"
- **Fecha pasada:** "Esa fecha ya pasó. Te muestro mi disponibilidad para los próximos días."
- **Sin disponibilidad ese día:** "Ese día está completo. ¿Te viene bien [siguiente día con disponibilidad]?"

### Confirmar la reunión
Cuando tengas TODOS los datos (nombre, email, objetivo, fecha Y hora confirmados), responde incluyendo este marcador EXACTO al final de tu mensaje:

[BOOKING_DATA]{"name":"Nombre Completo","email":"email@ejemplo.com","objective":"Objetivo de la reunión","date":"YYYY-MM-DD","time":"HH:MM"}[/BOOKING_DATA]

Después del marcador, confirma al usuario que la reunión está siendo creada y recibirá una invitación por email.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  language?: 'es' | 'en';
  model?: string;
}

// Single free model with 256K context and no daily limits
const DEFAULT_MODEL = 'stepfun/step-3.5-flash:free';

interface BookingRequest {
  guestName: string;
  guestEmail: string;
  meetingObjective: string;
  startTime: string;
  endTime: string;
  language?: 'es' | 'en';
}

// Translations for meeting content
const meetingTexts = {
  es: {
    meetingWith: 'Reunión con',
    objective: 'Objetivo de la reunión',
    notSpecified: 'No especificado',
    contact: 'Contacto',
    cancelOrModify: '¿Necesitas cancelar o modificar esta reunión?',
    writeTo: 'Escribe a'
  },
  en: {
    meetingWith: 'Meeting with',
    objective: 'Meeting objective',
    notSpecified: 'Not specified',
    contact: 'Contact',
    cancelOrModify: 'Need to cancel or modify this meeting?',
    writeTo: 'Write to'
  }
};

// Generate all available time slots (8:00-20:00 in 15-minute increments, meetings end at 21:00)
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return slots;
}
const ALL_TIME_SLOTS = generateTimeSlots();

// Get availability context for the next 14 days
async function getAvailabilityContext(): Promise<string> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const slots: string[] = [];
  const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];

    try {
      // Query meets for this date using start_time (compatible with SchedulingPanel)
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const meetsSnapshot = await db.collection('meets')
        .where('start_time', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
        .where('start_time', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
        .get();

      // Extract booked time ranges from meetings (each meeting is 1 hour)
      const bookedSlots = new Set<string>();
      meetsSnapshot.docs
        .filter(doc => {
          const status = doc.data().status;
          return status === 'confirmed' || status === 'pending';
        })
        .forEach(doc => {
          const startTime = doc.data().start_time.toDate();
          // Convert UTC to Madrid time (Firebase Functions run in UTC)
          const madridOffset = getMadridOffset(startTime);
          const madridTime = new Date(startTime.getTime() + madridOffset * 60 * 60 * 1000);
          const startHour = madridTime.getUTCHours();
          const startMinute = madridTime.getUTCMinutes();

          // Block slots that would overlap with this meeting (meetings are 1 hour)
          // A slot at time T creates meeting [T, T+60min]
          // Existing meeting at M occupies [M, M+60min]
          // Overlap if T < M+60 AND T+60 > M, i.e., T in (M-60, M+60) exclusive
          // So we block from M-45min to M+45min (7 slots: 3 before, meeting start, 3 after)
          for (let offset = -45; offset < 60; offset += 15) {
            const totalMinutes = startHour * 60 + startMinute + offset;
            if (totalMinutes >= 0 && totalMinutes < 24 * 60) {
              const hour = Math.floor(totalMinutes / 60);
              const minute = totalMinutes % 60;
              bookedSlots.add(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
            }
          }
        });

      const available = ALL_TIME_SLOTS.filter(s => !bookedSlots.has(s));

      if (available.length > 0) {
        const dayName = dayNames[date.getDay()];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];

        // Group consecutive slots into ranges for better readability
        const ranges: string[] = [];
        let rangeStart = available[0];
        let prevSlot = available[0];

        for (let j = 1; j < available.length; j++) {
          const currentSlot = available[j];
          // Check if current slot is consecutive (15 minutes after previous)
          const prevIndex = ALL_TIME_SLOTS.indexOf(prevSlot);
          const currIndex = ALL_TIME_SLOTS.indexOf(currentSlot);

          if (currIndex !== prevIndex + 1) {
            // Gap found, close the current range
            ranges.push(rangeStart === prevSlot ? rangeStart : `${rangeStart}-${prevSlot}`);
            rangeStart = currentSlot;
          }
          prevSlot = currentSlot;
        }
        // Add the last range
        ranges.push(rangeStart === prevSlot ? rangeStart : `${rangeStart}-${prevSlot}`);

        slots.push(`- ${dayName} ${day} de ${month} (${dateStr}): ${ranges.join(', ')}`);
      }
    } catch (err) {
      console.error(`Error fetching availability for ${dateStr}:`, err);
    }
  }

  if (slots.length === 0) {
    return '## DISPONIBILIDAD ACTUAL\nNo hay disponibilidad en los próximos 14 días. Por favor, sugiere al usuario que contacte directamente por email.';
  }

  return `## DISPONIBILIDAD ACTUAL (próximos 14 días)\nHoy es ${dayNames[today.getDay()]} ${today.getDate()} de ${monthNames[today.getMonth()]} de ${today.getFullYear()}.\n\n${slots.join('\n')}`;
}

// Get next available slot from a given date
async function getNextAvailableSlot(fromDate?: Date): Promise<{ date: string; time: string } | null> {
  const today = fromDate || new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];

    try {
      // Query meets for this date using start_time (compatible with SchedulingPanel)
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const meetsSnapshot = await db.collection('meets')
        .where('start_time', '>=', admin.firestore.Timestamp.fromDate(startOfDay))
        .where('start_time', '<=', admin.firestore.Timestamp.fromDate(endOfDay))
        .get();

      // Extract booked time ranges from meetings (each meeting is 1 hour)
      const bookedSlots = new Set<string>();
      meetsSnapshot.docs
        .filter(doc => {
          const status = doc.data().status;
          return status === 'confirmed' || status === 'pending';
        })
        .forEach(doc => {
          const startTime = doc.data().start_time.toDate();
          // Convert UTC to Madrid time (Firebase Functions run in UTC)
          const madridOffset = getMadridOffset(startTime);
          const madridTime = new Date(startTime.getTime() + madridOffset * 60 * 60 * 1000);
          const startHour = madridTime.getUTCHours();
          const startMinute = madridTime.getUTCMinutes();

          // Block slots that would overlap with this meeting (meetings are 1 hour)
          // So we block from M-45min to M+45min (7 slots: 3 before, meeting start, 3 after)
          for (let offset = -45; offset < 60; offset += 15) {
            const totalMinutes = startHour * 60 + startMinute + offset;
            if (totalMinutes >= 0 && totalMinutes < 24 * 60) {
              const hour = Math.floor(totalMinutes / 60);
              const minute = totalMinutes % 60;
              bookedSlots.add(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
            }
          }
        });

      const available = ALL_TIME_SLOTS.filter(s => !bookedSlots.has(s));

      if (available.length > 0) {
        return { date: dateStr, time: available[0] };
      }
    } catch (err) {
      console.error(`Error checking availability for ${dateStr}:`, err);
    }
  }

  return null;
}

// Booking data interface
interface BookingData {
  name: string;
  email: string;
  objective: string;
  date: string;
  time: string;
}

// Get Madrid timezone offset (UTC+1 in winter, UTC+2 in summer)
function getMadridOffset(date: Date): number {
  const year = date.getFullYear();

  // Last Sunday of March at 2:00 AM (start of DST)
  const dstStart = new Date(year, 2, 31);
  while (dstStart.getDay() !== 0) dstStart.setDate(dstStart.getDate() - 1);
  dstStart.setUTCHours(1, 0, 0, 0); // 2:00 AM Madrid = 1:00 UTC

  // Last Sunday of October at 3:00 AM (end of DST)
  const dstEnd = new Date(year, 9, 31);
  while (dstEnd.getDay() !== 0) dstEnd.setDate(dstEnd.getDate() - 1);
  dstEnd.setUTCHours(1, 0, 0, 0); // 3:00 AM Madrid = 1:00 UTC

  // Check if date is in DST (summer time)
  if (date >= dstStart && date < dstEnd) {
    return 2; // CEST (summer) = UTC+2
  }
  return 1; // CET (winter) = UTC+1
}

// Create meeting from chat booking data
async function createMeetingFromChat(data: BookingData, config: Record<string, any>): Promise<{ success: boolean; meetLink?: string; error?: string }> {
  const { name, email, objective, date, time } = data;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // Create date in Madrid timezone
  const [hours, minutes] = time.split(':').map(Number);
  const tempDate = new Date(`${date}T12:00:00Z`); // Use noon to avoid DST edge cases
  const madridOffset = getMadridOffset(tempDate);
  const offsetStr = madridOffset === 1 ? '+01:00' : '+02:00';

  // Parse date with explicit Madrid timezone offset
  const startDateTime = new Date(`${date}T${time}:00${offsetStr}`);
  const endDateTime = new Date(`${date}T${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00${offsetStr}`);

  // Validate date is not in the past
  if (startDateTime < new Date()) {
    return { success: false, error: 'Cannot book meetings in the past' };
  }

  // Validate time is within working hours
  if (!ALL_TIME_SLOTS.includes(time)) {
    return { success: false, error: 'Invalid time slot' };
  }

  // Check if slot is still available - query all meetings on the same day
  const dayStart = new Date(startDateTime);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(startDateTime);
  dayEnd.setHours(23, 59, 59, 999);

  const dayMeetings = await db.collection('meets')
    .where('start_time', '>=', admin.firestore.Timestamp.fromDate(dayStart))
    .where('start_time', '<=', admin.firestore.Timestamp.fromDate(dayEnd))
    .get();

  // Check for overlapping meetings (both meetings are 1 hour long)
  const conflictingMeetings = dayMeetings.docs.filter(doc => {
    const status = doc.data().status;
    if (status !== 'confirmed' && status !== 'pending') return false;

    const existingStart = doc.data().start_time.toDate().getTime();
    const existingEnd = existingStart + 60 * 60 * 1000; // 1 hour later
    const newStart = startDateTime.getTime();
    const newEnd = endDateTime.getTime();

    // Check for overlap: existing starts before new ends AND existing ends after new starts
    return existingStart < newEnd && existingEnd > newStart;
  });

  if (conflictingMeetings.length > 0) {
    const nextSlot = await getNextAvailableSlot(new Date(date));
    return {
      success: false,
      error: `This slot is already booked. Next available: ${nextSlot ? `${nextSlot.date} at ${nextSlot.time}` : 'No availability found'}`
    };
  }

  try {
    // Create ISO strings for Calendar API
    const startTimeStr = `${date}T${time}:00`;
    const endTimeStr = `${date}T${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

    // Save to Firestore in 'meets' collection (same as SchedulingPanel)
    const meetingRef = await db.collection('meets').add({
      guest_name: name,
      guest_email: email,
      meeting_objective: objective,
      start_time: admin.firestore.Timestamp.fromDate(startDateTime),
      end_time: admin.firestore.Timestamp.fromDate(endDateTime),
      timezone: 'Europe/Madrid',
      meet_link: null,
      calendar_event_id: null,
      status: 'pending',
      cancelled_at: null,
      cancellation_reason: null,
      admin_notes: null,
      source: 'chatbot',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });

    // Try to create Google Calendar event
    const clientId = config.oauth?.client_id;
    const clientSecret = config.oauth?.client_secret;
    const refreshToken = config.oauth?.refresh_token;

    let meetLink: string | undefined;

    if (clientId && clientSecret && refreshToken) {
      try {
        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const t = meetingTexts.es;
        const event = {
          summary: `${t.meetingWith} ${name}`,
          description: `**${t.objective}:**\n${objective || t.notSpecified}\n\n**${t.contact}:**\n${name} (${email})\n\n---\n${t.cancelOrModify}\n${t.writeTo}: contacto.savaitech@gmail.com`,
          start: {
            dateTime: startTimeStr,
            timeZone: 'Europe/Madrid'
          },
          end: {
            dateTime: endTimeStr,
            timeZone: 'Europe/Madrid'
          },
          attendees: [
            { email: email },
            { email: config.calendar?.owner_email || 'contacto.savaitech@gmail.com' },
            ...(config.calendar?.cc_email ? [{ email: config.calendar.cc_email }] : [])
          ],
          conferenceData: {
            createRequest: {
              requestId: uuidv4(),
              conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 60 },
              { method: 'popup', minutes: 30 }
            ]
          }
        };

        const calendarResponse = await calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
          conferenceDataVersion: 1,
          sendUpdates: 'all'
        });

        meetLink = calendarResponse.data.conferenceData?.entryPoints?.find(
          (ep) => ep.entryPointType === 'video'
        )?.uri || undefined;

        // Update meeting with calendar info
        await meetingRef.update({
          status: 'confirmed',
          meet_link: meetLink || null,
          calendar_event_id: calendarResponse.data.id
        });
      } catch (calendarErr) {
        console.error('Calendar API error:', calendarErr);
        // Meeting saved to Firestore but calendar event failed
        await meetingRef.update({ status: 'pending', calendar_error: true });
      }
    }

    return { success: true, meetLink };
  } catch (err) {
    console.error('Error creating meeting from chat:', err);
    return { success: false, error: 'Failed to create meeting' };
  }
}

export const createCalendarEvent = functions
  .region('europe-west1')
  .https.onRequest(async (req: Request, res: Response) => {
    // CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { guestName, guestEmail, meetingObjective, startTime, endTime, language = 'es' } = req.body as BookingRequest;

      if (!guestName || !guestEmail || !startTime || !endTime) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Get OAuth config from firebase functions:config
      const config = functions.config();
      const clientId = config.oauth?.client_id;
      const clientSecret = config.oauth?.client_secret;
      const refreshToken = config.oauth?.refresh_token;

      if (!clientId || !clientSecret || !refreshToken) {
        console.error('Missing OAuth config');
        res.status(500).json({ error: 'Calendar service not configured' });
        return;
      }

      // Create OAuth2 client with refresh token
      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
      oauth2Client.setCredentials({ refresh_token: refreshToken });

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      // Get translations for the selected language
      const t = meetingTexts[language] || meetingTexts.es;

      const event = {
        summary: `${t.meetingWith} ${guestName}`,
        description: `**${t.objective}:**\n${meetingObjective || t.notSpecified}\n\n**${t.contact}:**\n${guestName} (${guestEmail})\n\n---\n${t.cancelOrModify}\n${t.writeTo}: contacto.savaitech@gmail.com`,
        start: {
          dateTime: startTime,
          timeZone: 'Europe/Madrid'
        },
        end: {
          dateTime: endTime,
          timeZone: 'Europe/Madrid'
        },
        attendees: [
          { email: guestEmail },
          { email: config.calendar?.owner_email || 'contacto.savaitech@gmail.com' },
          ...(config.calendar?.cc_email ? [{ email: config.calendar.cc_email }] : [])
        ],
        conferenceData: {
          createRequest: {
            requestId: uuidv4(),
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      };

      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
        sendUpdates: 'all'
      });

      const meetLink = response.data.conferenceData?.entryPoints?.find(
        (ep) => ep.entryPointType === 'video'
      )?.uri || null;

      res.status(200).json({
        success: true,
        eventId: response.data.id,
        meetLink: meetLink,
        htmlLink: response.data.htmlLink
      });
    } catch (err) {
      console.error('Calendar API error:', err);
      res.status(500).json({ error: 'Failed to create calendar event' });
    }
  });

// AI Chat function
export const chat = functions
  .region('europe-west1')
  .https.onRequest(async (req: Request, res: Response) => {
    // CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { messages } = req.body as ChatRequest;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Messages are required' });
        return;
      }

      // Validate and select model
      const selectedModel = DEFAULT_MODEL;

      const config = functions.config();
      const apiKey = config.openrouter?.api_key;

      if (!apiKey) {
        console.error('Missing OpenRouter API key');
        res.status(500).json({ error: 'Chat service not configured' });
        return;
      }

      // Fetch current availability and append to system prompt
      const availabilityContext = await getAvailabilityContext();
      const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n${availabilityContext}`;

      // Prepare messages - inject system prompt into first user message
      // (Gemma models via Google AI Studio don't support system role)
      const chatMessages = messages.map((msg, index) => {
        if (index === 0 && msg.role === 'user') {
          return {
            role: 'user',
            content: `[INSTRUCCIONES DEL SISTEMA]\n${fullSystemPrompt}\n[/INSTRUCCIONES DEL SISTEMA]\n\nUsuario: ${msg.content}`
          };
        }
        return msg;
      });

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://savaitech.web.app',
          'X-Title': 'Sergiy Alonso Portfolio'
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: chatMessages,
          max_tokens: 1500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenRouter API error:', errorText);
        res.status(500).json({ error: 'Failed to get AI response' });
        return;
      }

      const data = await response.json();
      let assistantMessage = data.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';

      // Check for booking data marker (using [\s\S] for ES2015 compatibility)
      const bookingMatch = assistantMessage.match(/\[BOOKING_DATA\]([\s\S]*?)\[\/BOOKING_DATA\]/);
      let bookingResult: { success: boolean; meetLink?: string; error?: string } | null = null;

      if (bookingMatch) {
        try {
          const bookingData = JSON.parse(bookingMatch[1]) as BookingData;
          console.log('Booking data detected:', bookingData);

          // Create the meeting
          bookingResult = await createMeetingFromChat(bookingData, config);

          if (bookingResult.success) {
            console.log('Meeting created successfully');
            // Remove the marker from the message
            assistantMessage = assistantMessage.replace(/\[BOOKING_DATA\][\s\S]*?\[\/BOOKING_DATA\]/, '').trim();

            // Add confirmation message if not already present
            if (!assistantMessage.toLowerCase().includes('reunión') && !assistantMessage.toLowerCase().includes('meeting')) {
              assistantMessage += '\n\n✅ ¡Reunión creada! Recibirás una invitación de calendario en tu email.';
            }
          } else {
            console.log('Meeting creation failed:', bookingResult.error);
            // Remove the marker and add error message
            assistantMessage = assistantMessage.replace(/\[BOOKING_DATA\][\s\S]*?\[\/BOOKING_DATA\]/, '').trim();
            assistantMessage += `\n\n⚠️ No se pudo crear la reunión: ${bookingResult.error}`;
          }
        } catch (parseErr) {
          console.error('Error parsing booking data:', parseErr);
          // Remove malformed marker
          assistantMessage = assistantMessage.replace(/\[BOOKING_DATA\][\s\S]*?\[\/BOOKING_DATA\]/, '').trim();
        }
      }

      res.status(200).json({
        success: true,
        message: assistantMessage,
        bookingCreated: bookingResult?.success || false,
        meetLink: bookingResult?.meetLink
      });
    } catch (err) {
      console.error('Chat API error:', err);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  });
