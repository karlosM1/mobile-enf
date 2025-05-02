import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, plate_number, email, clerkId } = await request.json();

    if (!name || !plate_number || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const response = await sql`
      INSERT INTO users (
        name,
        plate_number,
        email,
        clerk_id
      ) VALUES (
        ${name},
        ${plate_number},
        ${email},
        ${clerkId}
      )
    `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error("Error inserting user:", error);
    return Response.json({ error: error }, { status: 500 });
  }
}
