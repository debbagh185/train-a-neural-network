const individualSize = 8;
const populationSize = 8;

const generateRandomIndividual = () => {
    let individual = []
    for(let i=0;i<individualSize;i++) {
        individual.push(Math.random() > 0.5 ? 1 : 0)
    }
    return individual
}

const generateRandomPopulation = () => {
    let pop = [];
    for(let i=0;i<populationSize;i++) {
        pop.push(generateRandomIndividual());
    }
    return pop;
}

const fillPopulation = (population,selector) => {
    let popDiv = document.querySelector(selector);
    let attrs = {
        "style" : "color : white;"
    }
    popDiv.innerHTML = ''
    population.forEach(indv => {
        let childNode = document.createElement("p");
        let childTextNode = document.createTextNode(indv.join(""));
        childNode.appendChild(childTextNode);
        childNode.setAttribute("style" , attrs.style)
        popDiv.appendChild(childNode);
    });
}

const sortPopulation = () => {
    population.sort((indv1,indv2) => {
        return calculateFitness(indv2) - calculateFitness(indv1);
    })
    fillPopulation(population,".population");
}

const calculateFitness = (individual) => {
    let fitness = 0;
    for(let i=0;i<individualSize;i++) {
        fitness+=individual[i];
    }
    return fitness;
}

const crossOver = (indv1,indv2) => {
    return indv1.slice(0,4).concat(indv2.slice(4));
}

const crossOverPopulation = (oldPop) => {
    let newPop = [];
    newPop.push(oldPop[0].slice());
    newPop.push(crossOver(oldPop[0],oldPop[1]));
    newPop.push(crossOver(oldPop[0],oldPop[2]));
    newPop.push(crossOver(oldPop[0],oldPop[3]));
    newPop.push(crossOver(oldPop[1],oldPop[2]));
    newPop.push(crossOver(oldPop[2],oldPop[3]));
    newPop.push(crossOver(oldPop[1],oldPop[3]));
    newPop.push(crossOver(oldPop[3],oldPop[4]));
    return newPop;
}

const mutateIndividual = (indv) => {
    let order = Math.floor(Math.random() * indv.length);
    if(indv[order] === 0) indv[order] = 1
    else indv[order] = 0
    return indv;
}

const mutatePopulation = (pop) => {
    for(let i=0;i<4;i++) {
        pop[i] = mutateIndividual(pop[i])
    }
}


const getNextGeneration = (newPop) => {
    let nextGeneration = [];
    nextGeneration = newPop.slice();
    return nextGeneration;
}