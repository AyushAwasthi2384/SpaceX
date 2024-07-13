import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { User } from '@/utils/user.model';
import { connectDb } from '@/utils/db';
import { cookies } from 'next/headers';

connectDb();

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Token not provided' }, { status: 401 });
    }
    const decoded = verify(token?.value, process.env.NEXT_PUBLIC_TOKEN_SECRET);
    const user = await User.findById(decoded.id); 
    if (!user) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user, role: user.role });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
