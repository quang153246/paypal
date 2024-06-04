import { ReactElement, useState } from 'react'
import { EmailContext } from './context/AppContext';

export default function EmailProvider({ children } : { children:ReactElement }) {
  const [currEmail, setCurrentEmail] = useState('');

  return (
    <EmailContext.Provider value = {{currEmail, setCurrentEmail}}>
      {children}
    </EmailContext.Provider>
  )
}
