
import Image from "next/image";
import Background from './/components/Background';
export default function Loading() {
  return (
    <div className="relative -z-10 flex items-center justify-center h-screen overflow-hidden bg-transparent">
 
    <Background/>

      <Image
        src="/loading.gif"
        alt="Loading..."
        width={150}
        height={150}
        unoptimized
        className="relative z-10"
      />
    </div>
  );
}
