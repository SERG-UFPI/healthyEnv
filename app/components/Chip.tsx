const Chip = ({ label }) => {
  return (
    <div style={{
      marginRight: '10px',
      marginTop: '5px',
      backgroundColor: '#c9cfde',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: 14
    }}>
      {label}
    </div>
  )
}

export default Chip