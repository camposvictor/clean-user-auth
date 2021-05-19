const Title: React.FC = ({ children }) => {
  return (
    <h1>
      {children}
      <style jsx>{`
        h1 {
          font-size: 2rem;
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </h1>
  )
}

export default Title
