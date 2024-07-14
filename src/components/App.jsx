import React, { useState, useEffect } from "react";

function App() {
	const [isXTurn, setIsXTurn] = useState(true);
	const [currentGameData, setCurrentGameData] = useState(Array(9).fill(""));
	const [status, setStatus] = useState("");
	const [showButton, setShowButton] = useState(false);

	function handleRestartGame() {
		setCurrentGameData(Array(9).fill(""));
		setIsXTurn(true);
		setShowButton(false);
	}

	function gameResult(currentGameData) {
		const winPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < winPatterns.length; i++) {
			const [x, y, z] = winPatterns[i];
			if (
				currentGameData[x] &&
				currentGameData[x] === currentGameData[y] &&
				currentGameData[x] === currentGameData[z]
			) {
				return currentGameData[x];
			}
		}
		return null;
	}

	function handleClick(currentIndex) {
		let cpyCurrentGameData = [...currentGameData];
		if (
			gameResult(cpyCurrentGameData) ||
			cpyCurrentGameData[currentIndex]
		) {
			return;
		}
		cpyCurrentGameData[currentIndex] = isXTurn ? "X" : "O";
		setIsXTurn(!isXTurn);
		setCurrentGameData(cpyCurrentGameData);
	}

	useEffect(() => {
		if (
			!gameResult(currentGameData) &&
			currentGameData.every((item) => {
				return item !== "";
			})
		) {
			setStatus(`This is a draw!`);
			setShowButton(true);
		} else if (gameResult(currentGameData)) {
			setStatus(`Winner is ${gameResult(currentGameData)}`);
			setShowButton(true);
		} else {
			setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
		}
	}, [currentGameData, isXTurn]);

	return (
		<div className="app-container">
			<h1 className="game-heading">Tic Tac Toe</h1>
			<div className="game-container">
				{Array(9)
					.fill()
					.map((x, index) => {
						return (
							<button
								onClick={() => handleClick(index)}
								className="box"
								key={index}>
								{currentGameData[index]}
							</button>
						);
					})}
			</div>
			<div className="game-result">{status}</div>
			{showButton ? (
				<button onClick={handleRestartGame} className="restart-btn">
					Restart
				</button>
			) : null}
		</div>
	);
}

export default App;
