import img from "../../public/lamp.jpg";

function Description() {
  return (
    <div className = "pt-15 pl-40 pr-40 pb-15">
      <p>
        The goal of this project is to strip away some of the magic
        that surrounds computers. In other words we'll take
        a peek into a few "black boxes" of our 
        internet world. Technology has been, and will be an
        overbearing presence in our lives. As a result we are tasked with fostering a healthy
        relationship with it, a problem that matters now more than ever.
        I think part of approaching the internet,
        involves grounding it in its roots. This means peeling 
        back abstractions and seeing human-designed algorithms and 
        concepts with our own eyes. if the narrative is 
        we were "plopped" into cyberspace, left to swim, there's 
        no chance of exercising individual control over these tools. 
        So, I wanted to create a quiet place to tinker with ideas, and 
        extract sense underneath what's visible. In doing so, 
        perhaps it will serve a reminder that we are observers, rather than occupants
        to this alluring digital world. 
      </p>
      <br></br>
      <p>
        I focus on fundamental concepts 
        most people interact with every day. Each concept has been 
        hand-picked, woven, and chosen by me by the criteria of  
        being "visualizable" and valuable in understanding. With that being said, 
        I am not an expert and by no means an authority. Like many, I often
        yearn for a quieter mind and environment. This project is 
        only an expression of such a concern in a way I felt fit. 
        Right now only an AST is available. I plan to add some concepts
        from Computer Networking, VMs, Computer Graphics, and maybe Databases. 
      </p>
      <br></br>
      <p> 
      </p>
    </div>
  )
}


export function Home() {
  return (
  <>
    <main className="flex items-center justify-center min-h-screen bg-white pr-20 pl-20 pt-20 border-1">
      <h1 className="text-center text-8xl font-bold text-neutral-900" style={{ fontFamily: "'Source Serif 4', serif" }}>
        Visualize the Internet
      </h1>

      <div>
        <img src={img} alt = ""></img>
      </div>
    </main>

    <Description />
  </>
    
  );
}
