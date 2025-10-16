const Example = () => {
  // elimde bir data var bunlardan her biri için bir kart oluşturup tüm kartları arayüzde göstermek istiyorum
  const data = [
    { name: "ahmet", age: 25 },
    { name: "mehmet", age: 30 },
    { name: "ismet", age: 22 },
    { name: "fatma", age: 28 },
    { name: "selim", age: 88 },
    { name: "ayşe", age: 12 },
  ];
//  Bir container oluşturuyorum tüm kartları oraya ekleyeceğim
  const container = document.createElement("div");
  // container'a class ekliyorum.
  container.classList.add("container");
//  Elimdeki her bir data için bir kart oluşturuyorum.

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");


    card.innerHTML = `
    <h2>Çalışan kartı</h2>
      <p>ad: ${item.name}</p>
      <p>yaşı:${item.age}</p>
      <button>sil</button>
    `;

    // cartın içinden butonu buluyorum.
    const button = card.querySelector("button");
    // Silme butonuna tıklayınca div’i kaldır.
    button.addEventListener("click", () => card.remove());
    // cartı container’a ekliyorum.
    container.appendChild(card);
  });

  return container;
};

export default Example;
