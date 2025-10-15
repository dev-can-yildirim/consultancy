const Example = () => { 
    const exampleDiv = document.createElement("div");
    exampleDiv.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
        <h2>Example Component</h2>
        <p>This is an example component.</p>
      </div>    
    `;
    return exampleDiv;
}
export default Example;