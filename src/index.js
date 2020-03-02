const { app, BrowserWindow, Menu  } = require ('electron');

const url = require ('url');
const path = require ('path');

//Actualizar pantalla sin estar reiniciando, solo cuando este en produuccion
if (process.env.NODE_ENV !== 'production'){

    require ('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', 'bin', 'electron')
    })

}

let mainWindow
let newProductWindow 

app.on ('ready', () => {

    mainWindow = new BrowserWindow ({});

    mainWindow.loadURL(url.format ({
        pathname: path.join (__dirname, 'views/index.html' ),
        protocol: 'file',
        slashes: true
    
    }))

    //Insertar barra de menu nueva
    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu);
    
    mainWindow.on('close', () =>{
        app.quit();
    })

});

//Funcion para crear nueva ventana
function createNewProductWindow() {
    newProductWindow = new BrowserWindow ({
        width: 400,
        height: 330,
        title: 'Add A New Product'

    });

    //Para que ya no aparezca 
   // newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format ({
        pathname: path.join (__dirname, 'views/new-product.html' ),
        protocol: 'file',
        slashes: true
    
    }))

    newProductWindow.on('close', () => {
        newProductWindow = null; 
    });

}

//Menu para la pagina principal
const templateMenu = [
    {
        //Etiqueta de los menus
        label: 'File',
        //Adentro de la etiqueta de file
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow();
                }

            },
            {
                label: 'Remove All Products',
                click(){

                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]

    }
    
];

//Para el caso de que sea mac
if(process.platform === 'darwin'){
    templateMenu.unshift({
        label: app.getName()
    });
}


if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click (item, focusedWindow) { 
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}