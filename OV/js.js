let url = "https://vtr.valasztas.hu/ep2024/data/06120800/szavossz/09/TelepEredm-09-044.json";
let string = ["megyekód;településkód;választók száma;érvénytelen;1;2;3;4;5;6;7;8;9;10;11"];
let lista = [];
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

fetch("https://vtr.valasztas.hu/onk2024/data/06091753/ver/Megyek.json")
    .then(res => res.json())
    .then(async data => {
        console.log(data.list[0].leiro);

        for (let index = 1; index <= data.list.length; index++) {
            for (let index1 = 1; index1 <= data.list[index - 1].leiro.telep_db; index1++) {
                let megye = "";
                let telep = "";

                if (index1 < 10) {
                    telep = "00" + index1;
                } else if (index1 < 100) {
                    telep = "0" + index1;
                } else {
                    telep = index1;
                }

                if (index >= 10) {
                    megye = index;
                } else {
                    megye = "0" + index;
                }

                let link = `https://vtr.valasztas.hu/ep2024/data/06120800/szavossz/${megye}/TelepEredm-${megye}-${telep}.json`;

                try {
                    let res1 = await fetch(link);
                    let data1 = await res1.json();
                    console.log(data1);
                    //string += `\n${megye};${telep};${data1.data.szk_megjelent};${data1.data.szl_ervenytelen}`;
                    
                    string.push(`${megye};${telep};${data1.data.szk_megjelent};${data1.data.szl_ervenytelen};${data1.data.tetelek.map(G => G.szavazat).join(';')}`);

                    // for (let index = 0; index < 11; index++) {
                    //     string+=";"+data1.data.tetelek[index].szavazat
                        
                    // }
                } catch (error) {
                    console.error(`Error fetching data for ${megye}-${telep}:`, error);
                }

                // Delay before the next request
                await delay(5);
            }
        }
        
        console.log("All fetches completed");
        // You can add any further processing here
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

    console.log(string.join('\n'))