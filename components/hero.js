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
            <h1 className="text-5xl m-4 text-gray-300">Hi, I'm Jonathan Mui</h1>
            <p className="text-left w-full text-xl text-gray-200 m-auto">
                I'm currently a computer engineering student studying in the National University of Singapore. As a freshman entering into university in 2020, I had many
                questions about university life, workload, advice etc but I didn't really have many people to turn to for
                advice since I didn't know many people studying computer engineering. The fact that Covid shifted school
                online and reduced social interactions did not help. Using this blog, I hope to share with you juniors how
                an average student (believe me I'll openly share some of my grades in my posts and they are average) approaches
                university, some of the things you'll learn and some of the projects that I've worked on with the skills I've learnt.
                Hopefully, you guys will find my experiences and advice useful and that you'll be able to better create your own experiences
                and make more informed decisions. 😊
            </p>
        </section>
    )
}

export default Hero;