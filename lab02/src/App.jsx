import "./App.css";
import profile from "./assets/profile.jpg";

function App() {
  return (
    <div className="container">
      {/* Left Side */}
      <div className="left">
        <img src={profile} alt="Profile" className="profile" />

        <h1>Koushal Mandal</h1>
        <h3>Full Stack Developer</h3>
      </div>

      {/* Right Side */}
      <div className="right">

        <section>
          <h2>About Me</h2>
          <p>
            Passionate Full Stack Developer with knowledge of HTML, CSS,
            JavaScript, React.js, Node.js, Express.js and MySQL. I enjoy
            building responsive web applications and continuously learning
            new technologies.
          </p>
        </section>

        <section>
          <h2>Contact</h2>

          <p><strong>Email :</strong> koushal.ma0607@gmail.com</p>

          <p><strong>Phone :</strong> +91 8969760918</p>

          <p><strong>Location :</strong> India</p>

          <p>
            <strong>GitHub :</strong>{" "}
            <a
              href="https://github.com/koushal"
              target="_blank"
              rel="noreferrer"
            >
              github.com/koushal
            </a>
          </p>

          <p>
            <strong>LinkedIn :</strong>{" "}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com
            </a>
          </p>
        </section>

        <section>
          <h2>Education</h2>

          <p>
            <strong>Bachelor of Computer Applications (Hons.)</strong>
          </p>

          <p>2023 - 2026</p>
        </section>

        <section>
          <h2>Technical Skills</h2>

          <div className="skills">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React.js</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MySQL</span>
            <span>Git</span>
            <span>GitHub</span>
          </div>
        </section>

        <section>
          <h2>Projects</h2>

          <div className="project">
            <h4>AI-Based Website Threat Analyzer</h4>

            <p>
              Developed a website security analyzer using React.js,
              Node.js, Express.js and MySQL to detect phishing websites
              and analyze URLs.
            </p>
          </div>

          <div className="project">
            <h4>Fire Safety Training Simulator</h4>

            <p>
              Built a Unity-based simulator that teaches users how to
              operate a fire extinguisher during emergency situations.
            </p>
          </div>
        </section>

        <section>
          <h2>Internship</h2>

          <p>
            <strong>ARK Infosolutions</strong>
          </p>

          <p>AR/VR & Unity Development Intern</p>
        </section>

        <section>
          <h2>Languages</h2>

          <p>English • Hindi</p>
        </section>

      </div>
    </div>
  );
}

export default App;