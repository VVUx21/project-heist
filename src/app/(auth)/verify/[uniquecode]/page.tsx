'use client'
import RegisterForm from "@/components/Authform";
import { useParams } from 'next/navigation';
function Verify() {
  const params = useParams<{ uniquecode: string }>();
  return <RegisterForm type="verify" email={params.uniquecode} />;
}

export default Verify;
