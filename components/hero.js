import Image from "next/image";

function Hero() {
    return (
        <section className="text-center bg-gradient-to-b from-gray-800 to-gray-700 p-8">
            <div className="w-64 h-64 shadow-md rounded-full overflow-hidden bg-gray-700 m-auto">
                {/* public folder taken to be seen from root so don't need to prepend '/public' */}
                <Image
                    className="object-cover object-top w-full h-full"
                    src="/images/site/Jon.jpg"
                    alt="An image of Jonathan"
                    width={300}
                    height={300}
                />
            </div>
            <h1 className="text-6xl m-4 text-gray-300">Hi, I'm Jonathan Mui</h1>
            <p className="text-2xl text-gray-200 w-5/6 max-w-2xl m-auto">
                I'm currently a computer engineering student studying in the National University of Singapore. This is
                actually the first full blog I coded myself when I was learning Next.js with
                <a href="https://academind.com/courses"> Academind</a>. Besides tech, I also love playing sports and photography.
            </p>
        </section>
    )
}

export default Hero;