(() => {
	// Make the connections to the elements on the page so users can interact with them.
	// Add variables
	let theThumbnails = document.querySelectorAll('#buttonHolder img'),
				resetPuzzle = document.querySelector(".puzzle-pieces") 
				puzzlePieces = document.querySelectorAll('.puzzle-pieces *'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board');
				
				
	const piecePaths = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// theThumbnails collects alll of the image elements into an array-like container
	// [
	// 	<img src="images/buttonZero.jpg" alt="thumbnail">
	// 	<img src="images/buttonOne.jpg" alt="thumbnail">
	// 	<img src="images/buttonTwo.jpg" alt="thumbnail">
	// 	<img src="images/buttonThree.jpg" alt="thumbnail">
	// ]

	function changeImageSet () {
		// debugger; // pause our code execusion at this point
		// let key = this.dataset.bgref;

		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;
		// `` => this is a javascript template string. You can use it to write a bit of 
		// inline backgroundImage which will be interpreted at runtime 
		// search for MDN JavaScript Template String

		piecePaths.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgref}.jpg`;
			// Add a new child
			resetPuzzle.appendChild(puzzlePieces[index]);  

		})
	}

	function startDrag (event) {
		// save a reference to the element we're dragging
		event.dataTransfer.setData('draggedElement', event.target.id);
	}

	function draggedOver (event) {
		event.preventDefault();
	}

	function handleDrop (event) {
		event.preventDefault();
		let currentEl = event.dataTransfer.getData('draggedElement');
		// console.log(`dropped this element:`, currentEl);
        // Add return
		if (this.children.length > 0) {
			return;
		}  
		this.appendChild(document.querySelector(`#${currentEl}`));
	}

	// these are the "triggers" to fire off events
	theThumbnails.forEach(item => item.addEventListener('click', changeImageSet));
	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', startDrag));
	dropZones.forEach(zone => {
		zone.addEventListener('dragover', draggedOver);
		zone.addEventListener('drop', handleDrop);
	});
})();
