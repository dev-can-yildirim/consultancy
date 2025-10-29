const fetchData = async (a) => {
  try {
    
    const response = await fetch("../../db.json");
    const data = await response.json();
    return data[a];

  } catch (error) {
    console.error("Veri bulunamadı");
  }
};
export default fetchData;
