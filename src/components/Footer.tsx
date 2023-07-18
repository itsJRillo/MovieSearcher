import '../styles/footer.css'
import heartIcon from '../assets/heart.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Made with <img src={heartIcon} alt="heart icon" style={{width: "25px"}}/> by <a href="https://github.com/itsJRillo">itsJRillo</a></p>
      </div>
    </footer>
  )
}
