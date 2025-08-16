import styles from "./Footer.module.css";
const Footer = () => {
  return (
      <div className={styles.footer}>
          <div style={{display: "flex"}}>
            <div className={styles.footerLeft}>
              <h2
                style={{
                  fontFamily: "Archivo Black, sans-serif",
                  color: "var(--primary-bg)",
                  fontWeight: 400,
                  fontSize: "1.7rem",
                }}
              >
                SKILL SWAP
              </h2>
              <br />
              <br />
              <p style={{ color: "var(--secondary-bg)" }}>
                Free, Open Source decentralized <br />
                Skills Exchanging Platform
              </p>
            </div>

            <div className={styles.footerRight}>
              <ul className={styles.list}>
                <li className={styles.footerHeading}>Programs</li>
                <li>Become a Mentor</li>
                <li>Learn from Community</li>
                <li>Exchange a Skill</li>
              </ul>
              <ul className={styles.list}>
                <li className={styles.footerHeading}>Resources</li>
                <li>Source Code</li>
                <li>Blog</li>
                <li>Support</li>
              </ul>
              <ul className={styles.list}>
                <li className={styles.footerHeading}>Company</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Collaboration</li>
              </ul>
            </div>
          </div>

          <hr style={{color: "var(--secondary-bg)"}}/>

          <div>
            <div className="text-center" style={{ fontFamily: "Montserrat, sans-serif", color: "white" }}>
              Copyright &copy; 2025 SkillSwap. All rights reserved.
            </div>
          </div>
      </div>
  );
};

export default Footer;
