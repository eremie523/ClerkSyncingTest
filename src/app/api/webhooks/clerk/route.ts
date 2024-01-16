import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { from } from 'svix/dist/openapi/rxjsStub'
import { createUserProps } from '@/types'
import { handleError } from '@/lib/utils'
import { createUser } from '@/lib/actions/user.action'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);

  return new Response('Error occurred', {
    status: 400
  });
  }

  const eventType = evt.type

  if(eventType === `user.created`){
    try {
      const {id, email_addresses, image_url, username, first_name, last_name} = evt.data;

      const user: createUserProps = {
        clerkId: id,
        email: email_addresses[0].email_address,
        photo: image_url,
        firstName: first_name,
        lastName: last_name,
        username: username!
      }

      const newUser = await createUser(user)

      if(newUser){
        clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          }
        })
      }

      NextResponse.json({
        message: 'OK',
        user: newUser
      })

    } catch (error: any) {
      handleError(error)
    }
    
  }

  // Handle User Create Event from Webhook


  return new Response('', { status: 200 })
}
