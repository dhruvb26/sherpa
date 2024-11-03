import { html } from './renderHtml';


export default {
  async fetch(request, env) {
    const { DATABASE } = env;


    // Use your D1 database via the DATABASE binding


    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=UTF-8'
      }
    });
  },
};

