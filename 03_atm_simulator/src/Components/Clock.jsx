function Clock({ minutes, seconds, isLoggedIn }) {
  return (
    <>
      {isLoggedIn && (
        <div className="box">
          <p>
            Your session expires in {minutes}:{seconds < 10 ? "0" + seconds : seconds}
          </p>
        </div>
      )}
    </>
  );
}

export default Clock;
