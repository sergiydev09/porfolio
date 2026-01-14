import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return json({ error: 'Email inválido' }, { status: 400 });
    }

    // TODO: Insert into Supabase when configured
    // const { error } = await locals.supabase.from('leads').insert({
    //   name: data.name,
    //   email: data.email,
    //   company: data.company || null,
    //   services_interested: data.service ? [data.service] : [],
    //   budget: data.budget || null,
    //   message: data.message,
    //   landing_page: request.headers.get('referer') || '/',
    //   user_agent: request.headers.get('user-agent') || null,
    //   status: 'new'
    // });

    // if (error) {
    //   console.error('Supabase error:', error);
    //   return json({ error: 'Error al guardar' }, { status: 500 });
    // }

    // For now, just log and return success
    console.log('New contact submission:', data);

    return json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return json({ error: 'Error interno del servidor' }, { status: 500 });
  }
};
