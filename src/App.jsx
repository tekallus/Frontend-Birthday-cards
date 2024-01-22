import { useState } from 'react'
import './styles.css'
import Header from './components/Header'
import FrontMessage from './components/FrontMessage'
import InnerMessage from './components/InnerMessage'

export default function App() {
  /* Challenge

	Kullanıcı kartın kapağına tıkladığında kart açılır ve kapanır, ancak kart şirketi daha sofistike bir kontrol yöntemi istiyor. Kullanıcının mouse ile parmağını kaydırmasını taklit eden bir yöntem. Göreviniz aşağıdaki gibi bir tane ayarlamaktır:
		
		1. "open" sınıfı, 34. satırdaki className'i "cover" olan div'e yalnızca aşağıdaki koşulların tümü karşılandığında uygulanmalıdır: 
		   	
			   - Kullanıcı mouse butonunu "cover" div'inin içinde bir yerde basılı tutuyorsa.
			   
    		   - Mouse butonunu basılı tutmaya devam ederken, imleci basılı tutmaya başladığı yerin 50 piksel soluna hareket ettirir. 
		
		2. Kullanıcı daha sonra mouse'unu "cover" div'i açıkken aşağı doğru hareket ettirirse, "open" 
		   class'ı kaldırılmalı ve böylece kart kapatılmalıdır. 
		   
	Not: cardOpen state'ini, 33. satırdaki onClick olay işleyicisini ve 34. satırdaki "open" class'ının şu anda uygulanma şeklini değiştirmeniz veya düzenlemeniz gerekecektir. 
*/

  const [cardOpen, setCardOpen] = useState(false)

  const handleMouseDown = () => {
    setCardOpen(true)
  } //onMouseDown: Kullanıcı fare butonuna tıkladığında kartın açık olup olmadığını belirleyen setCardOpen(true) fonksiyonu çağrıldı.
  const handleMouseUp = () => {
    setCardOpen(false)
  } //onMouseUp: Kullanıcı fare butonunu bıraktığında kartın kapalı olduğunu belirleyen setCardOpen(false) fonksiyonu çağrıldı.
  const handleMouseMove = (e) => {
    if (cardOpen) {
      const cover = document.querySelector('.cover')
      const rect = cover.getBoundingClientRect()
      const isInCover =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      if (!isInCover || e.movementY > 0) {
        // Eğer kullanıcı "cover" üzerinden çıkarsa veya aşağıya doğru hareket ederse

        setCardOpen(false)
      }
    }
  }
  return (
    <div className="wrapper">
      <Header />
      <div className="card">
        <InnerMessage />

        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClick={() => setCardOpen(!cardOpen)}
          className={`cover ${cardOpen && 'open'}`}
        >
          <FrontMessage />
          <img src="./images/forLoop.png" />
        </div>
      </div>
    </div>
  )
}
