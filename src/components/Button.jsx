const Button = ({classText, btnText, handleClick, isDisabled}) => {
  return (
    <button className={classText} onClick={handleClick} disabled={isDisabled}>{btnText}</button>
  )
}

export default Button