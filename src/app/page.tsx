import Footer from '@/components/Footer';
import InputBox from '@/components/InputBox';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-3">
      <div className="w-full text-center flex-col items-center justify-between p-24">
        <div>
          <div>
            {/* Title */}
            <div className="text-xl">Task Translator</div>

            {/* Subtitle */}
            <div className="text-sm text-gray-200">
              Translate your tasks into your CLI commands
            </div>
          </div>

          <div className="my-10">
            {/* Input box */}
            <InputBox />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
