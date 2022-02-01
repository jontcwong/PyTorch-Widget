document.addEventListener("DOMContentLoaded",
	function (event) {

		function changeToWhite(element) {
			element.style.color = "#6C6C6D";
			element.style.background = "#FFFFFF";
			//set attribute to unclicked
			element.setAttribute('clicked', 'false');
		}

		function changeToOrange(element) {
			element.style.color = "#FFFFFF";
			element.style.background = "#ee4c2c";
		}

		// Changes to Invalid
		function changeToInvalid(item) {
			document.getElementById(item).style.color = "#FFFFFF";
			document.getElementById(item).style.background = "#E1E1E4";
			document.getElementById(item).setAttribute('invalid', 'true');
			document.getElementById(item).setAttribute('clicked', 'false');
		}

		// Changes to Valid
		function changeToValid(item) {
			if (document.getElementById(item).getAttribute('clicked') !== 'true') {
				document.getElementById(item).style.color = "#6C6C6D";
				document.getElementById(item).style.background = "#FFFFFF";
			}
			document.getElementById(item).setAttribute('invalid', 'false');
		}

		const buttons = document.querySelectorAll(".item")
		for (const button of buttons) {
			button.addEventListener('click', updateWidget);
			button.addEventListener('mouseenter', function(event) {
				//if white then change to orange
				if (event.target.style.color !== "#ee4c2c" && event.target.getAttribute('invalid') !== 'true') {
					event.target.style.color = "#FFFFFF";
					event.target.style.background = "#ee4c2c";
				}
			});
			button.addEventListener('mouseleave', function(event) {
				//if not clicked then change back to white
				if (event.target.getAttribute('clicked') !== 'true' && event.target.getAttribute('invalid') !== 'true') {
					event.target.style.color = "#6C6C6D";
					event.target.style.background = "#FFFFFF";
				}
			});
		}
		//pre click top items
		document.getElementById("Stable").click();
		document.getElementById("Linux").click();
		document.getElementById("Conda").click();
		document.getElementById("Python").click();
		document.getElementById("CUDA 10.2").click();
		var pyTorch = "Stable", OS = "Linux", package = "Conda",
		 language = "Python", computePlatform = "CUDA 10.2";

		// set invalid compute platforms
		function setInvalidColor() {
			if (OS === "Mac") {
				changeToInvalid("CUDA 10.2");
				changeToInvalid("CUDA 11.3");
				changeToInvalid("ROCM");
				document.getElementById("CPU").click();
			}
			else if (OS === "Windows") {
				changeToValid("CUDA 10.2");
				changeToValid("CUDA 11.3");
				changeToInvalid("ROCM");
				if (document.getElementById("ROCM").getAttribute('clicked') === 'true')
					document.getElementById("CUDA 10.2").click();
			}
			else if (OS === "Linux") {
				changeToValid("CUDA 10.2");
				changeToValid("CUDA 11.3");
				changeToValid("ROCM");
			}
		}

		function changeCompute() {
			if (pyTorch === "Stable") {
				document.getElementById("CUDA 11.3").innerHTML = "CUDA 11.3";
				document.getElementById("ROCM").innerHTML = "ROCM 4.2 (beta)";

			}
			else if (pyTorch === "Preview") {
				document.getElementById("CUDA 11.3").innerHTML = "CUDA 11.3";
				document.getElementById("ROCM").innerHTML = "ROCM 4.3 (beta)";
			}
			if (pyTorch === "LTS") {
				document.getElementById("CUDA 11.3").innerHTML = "CUDA 11.1";
				document.getElementById("ROCM").innerHTML = "ROCM 4.2 (beta)";
			}
		}

		// When item in column clicked, turn orange and set rest of column to white
		function updateWidget() {
			// can't click invalid
			if (this.getAttribute('invalid') === 'true') return;
			// gets all divs with class containing col#
			var col = this.getAttribute("class");
			var colNum = Number(col.match(/\d+/g));
			var changes = document.querySelectorAll("div[class*=\""+col+"\"]");
			//set rest of column to white
			for (const change of changes) {
				if(change.getAttribute("invalid") !== "true") changeToWhite(change);
			}
			// set attribute to clicked when clicked
			this.setAttribute('clicked', 'true');
			// set clicked item to orange
			changeToOrange(this);
			// gets the column # and stores clicked item
			switch(colNum) {
				case 1:
					pyTorch = this.id;
					changeCompute();
					break;
				case 2:
					OS = this.id;
					setInvalidColor(); 
					break;
				case 3:
					package = this.id;
					break;
				case 4:
					language = this.id;
					break;
				case 5:
					computePlatform = this.id;
					break;
				default:
			}		
			if (document.getElementById(computePlatform)!= null) {
				document.getElementById("command").innerHTML = "pyTorch: " + pyTorch + "; OS: " + OS + "; Package: " + package + "; Language: " + language + "; Compute Platform: " + document.getElementById(computePlatform).innerHTML.trim() + ";";
			}

			return;
		}
	}
)

