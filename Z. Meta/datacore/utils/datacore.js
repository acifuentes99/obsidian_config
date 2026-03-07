

/*
*/
const filterDateSectionsByTitle = (parentNode) => parentNode.$sections.filter(a => {
    const regex = /\[\[Y. Journal\/Daily\/\d{4}-\d{2}-\d{2}\|/i;
    return regex.test(a.$title);
}).map(a => a.$ordinal);


/*
  */
const getSecitonOrdinalMap = (parentNode) => {
    const dateSections = filterDateSectionsByTitle(parentNode);
    let dict = {};

    for (i = 0; i < dateSections.length; i++) {
        let ordinals = [];
        let lastElement;
        if (i === dateSections.length - 1) {
            lastElement = parentNode.$sections.length + 1;
        }
        else {
            lastElement = dateSections[i+1];
        }

        for (j = dateSections[i] + 1; j < lastElement; j++) {
            ordinals.push(j);
        }
        dict[dateSections[i]] = ordinals;
    }
    return dict;
}

const reverseSectionOrdinalMap = (sectionOrdinalMap) => {
  const reversed = {};
  for (const [section, ordinals] of Object.entries(sectionOrdinalMap)) {
    for (ordinal of ordinals) {
      reversed[ordinal] = Number(section);
    }
  }
  return reversed;
}

const getSectionNodeThatBelongsToOrdinal = (parentNode, ordinal) => {
  const sectionNode = parentNode.$sections.find(section => section.$ordinal === ordinal);
  return sectionNode;
}

const extractDateFromDateLinkString = (dateLinkString) => {
  const match = dateLinkString.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
}


return {
  filterDateSectionsByTitle,
  getSecitonOrdinalMap,
  reverseSectionOrdinalMap,
  getSectionNodeThatBelongsToOrdinal,
  extractDateFromDateLinkString
}
