   
    const onClick = function() {    
      getFetch(this.innerHTML.toLowerCase())
    }  
  
  const spans = document.querySelectorAll('#classes > span')
  spans.forEach(span => span.addEventListener('click', onClick))

  let fetch1
  
  
  function getFetch(id){
    
    const url = `https://www.dnd5eapi.co/api/classes/${id}`
  
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data=> {
            fetch1 = data
            console.log(data)
              //Proficiencies       
              getProficiencies(data)
              //Saving throws
              getSavingThrows(data)
              //Starting equipment
              getStartingEquipment(data)
              //Subclasses
              getSubclass(data)
              //Spells
              // getSpells(data) 
            })         
            .catch(err => {
              console.log(`error ${err}`)
          });
    }      
    
    //create h2     
    function createH2(innerText){
      const section = document.getElementById('details') 
      const headings = document.createElement('h2')
      headings.innerText = innerText
      section.appendChild(headings) 
    }
    //create p  
    function createP(innerText) {
      const section = document.getElementById('details') 
      const paragraph = document.createElement('p')
      paragraph.innerText = innerText   
      section.appendChild(paragraph)
    }

    //loopElements
    function loopElements(element, data, drillDown, drillDown2){
      for (let i = 0; i < data[element].length; i++){
        let classInfo = drillDown2 ? data[element][i][drillDown][drillDown2] : data[element][i][drillDown]
        createP(classInfo)
      }
  }   
  
  // //  ---------------------------------------------- 
  
  
      //Proficiencies
    function getProficiencies(data) {
      createH2('Proficient In:')
      loopElements('proficiencies', data, 'name')
    }
      //Saiving Throws
    function getSavingThrows(data) {
      createH2('Saving Throws:')
      loopElements('saving_throws', data, 'name')  
    } 
      //Starting Equipment -> broken needs to be starting_equipment[i].equipment.name
    function getStartingEquipment(data) {
      createH2('Starting Equipment')
      loopElements('starting_equipment', data, 'equipment', 'name')
    }
    //Subclasses
    function getSubclass(data) {
      createH2('Sub Class(es):')
      loopElements('subclasses', data, 'name')  
    }
    
    //Spells -> would be interesting to work on, nest API?
    // function getSpells(data) {
    //   createH2('Class Spells:')
    //   loopElements('spellcasting', data, 'name')
    // }