import twilio from "twilio";

export async function handler(event, context) {
  const { nome, telefone, tratamento, data, hora } = JSON.parse(event.body);

  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

  try {
    await client.messages.create({
      body: `Olá ${nome}, a sua marcação para ${tratamento} está confirmada para ${data} às ${hora}. Obrigado!`,
      from: process.env.TWILIO_PHONE,
      to: telefone
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
