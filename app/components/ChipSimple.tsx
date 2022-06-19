const ChipSimple = ({ label }) => {
  return (
    <div style={{
      marginRight: '6px',
      marginTop: '5px',
      backgroundColor: '#EAEAEA',
      padding: '3px 8px',
      borderRadius: '20px',
      fontSize: 12
    }}>
      {label}
    </div>
  )
}

export default ChipSimple