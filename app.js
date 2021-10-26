/*

.--.   .--..-./`).--.      .--.-./`) ________    .-''-.,---------.  _______  .---.  .---.  
|  | _/  / \ .-.'|  |_     |  \ .-.'|        | .'_ _   \          \/   __  \ |   |  |_ _|  
| (`' ) /  / `-' | _( )_   |  / `-' |   .----'/ ( ` )   `--.  ,---| ,_/  \__)|   |  ( ' )  
|(_ ()_)    `-'`"|(_ o _)  |  |`-'`"|  _|____. (_ o _)  |  |   \,-./  )      |   '-(_{;}_) 
| (_,_)   __.---.| (_,_) \ |  |.---.|_( )_   |  (_,_)___|  :_ _:\  '_ '`)    |      (_,_)  
|  |\ \  |  |   ||  |/    \|  ||   |(_ o._)__'  \   .---.  (_I_) > (_)  )  __| _ _--.   |  
|  | \ `'   |   ||  '  /\  `  ||   ||(_,_)    \  `-'    / (_(=)_(  .  .-'_/  |( ' ) |   |  
|  |  \    /|   ||    /  \    ||   ||   |      \       /   (_I_) `-'`-'     /(_{;}_)|   |  
`--'   `'-' '---'`---'    `---`'---''---'       `'-..-'    '---'   `._____.' '(_,_) '---'  

by picsacoder
Official Repo: https://github.com/picsacoder/kiwifetch
*/

const sysinfo = require('systeminformation');
const fs = require('fs');
const chalk = require('chalk');
const os = require('os')

function formatBytes(a,b=2,k=1024){with(Math){let d=floor(log(a)/log(k));return 0==a?"0 Bytes":parseFloat((a/pow(k,d)).toFixed(max(0,b)))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}}
//Source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

function format(seconds){function pad(s){return (s < 10 ? '0' : '') + s;}var hours = Math.floor(seconds / (60*60));var minutes = Math.floor(seconds % (60*60) / 60);var seconds = Math.floor(seconds % 60);    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);}
//Source: https://stackoverflow.com/questions/28705009/how-do-i-get-the-server-uptime-in-node-js/28706630

async function kiwifetch() { 
    try { 
        //Title (Change this to change the title)
        let title = 'ｋｉｗｉｆｅｔｃｈ　ッ影ズ'
        
        //Getting data
        const data_os = await sysinfo.osInfo();
        const data_cpu = await sysinfo.cpu();
        const data_ram = await sysinfo.mem();
        const data_disk = await sysinfo.blockDevices();
        let uptime = os.uptime()
        
        //Print info
        let info = `${data_cpu.manufacturer} ${data_cpu.brand} (${data_cpu.cores}) ${data_cpu.speed} GHz`
        let info_ram = `${formatBytes(data_ram.active)}/${formatBytes(data_ram.total)}`
        let info_os = `${data_os.distro} ${data_os.platform}`
        let info_disk = `${data_disk[0].physical} ${formatBytes(data_disk[0].size)}`

        let draw = `
    ${chalk.red(title)}
                                                ${info_os}
    ⠄⠄⠄⢀⣤⣾⣿⡟⠋⠄⠄⠄⣀⡿⠄⠊⠄⠄⠄⠄⠄⠄⢸⠇⠄⢀⠃⠙⣿⣿
    ⣤⠒⠛⠛⠛⠛⠛⠛⠉⠉⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⠄⢀⠊⠄⠄⠈⢿  ${chalk.greenBright("CPU")}: ${chalk.magenta(info)}
    ⣿⣠⠤⠴⠶⠒⠶⠶⠤⠤⣤⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⠃⠄⠂⣀⣀⣀⡀⠄
    ⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⠂⠄⠄⠄⠄⠄⠄⢀⢎⠐⠛⠋⠉⠉⠉⠉⠛  ${chalk.greenBright("RAM")}: ${chalk.magenta(info_ram)}
    ⡇⠄⠄⠄⣀⡀⠄⠄⠄⢀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠎⠁⠄⠄⠄⠄⠄⠄⠄⠄
    ⡧⠶⣿⣿⣿⣿⣿⣿⠲⠦⣭⡃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⡀⠄⠄⠄⠄⠄⠄  ${chalk.greenBright("DISK")}: ${chalk.magenta(info_disk)}
    ⡇⠄⣿⣿⣿⣿⣿⣿⡄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢰⣾⣿⣿⣿⡟⠛⠶⠄
    ⡇⠄⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣼⣿⣿⣿⣿⡇⠄⠄⢀  ${chalk.greenBright("UPTIME")}: ${chalk.magenta(format(uptime))}
    ⡇⠄⢿⣿⣿⣿⣿⣷⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⡇⠄⠄⢊
    ⢠⠄⠈⠛⠛⠛⠛⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢿⣿⣿⣿⡦⠁⠄⠄⣼
    ⢸⠄⠈⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠉⠄⠄⠄⠄⢰⣿
    ⢸⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠁⠉⠄⢸⣿
    ⠄⣆⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿
    ⠄⢿⣷⣶⣄⡀⠄⠄⠄⠄⠄⠄⠉⠉⠉⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣴⣿⣿
    ⠄⢸⣿⣿⣿⣿⣷⣦⣤⣀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣤⣶⣿⣿⣿⣿⣿

        `
    
        console.log(draw)
    }
    catch(e) { 
        console.log(e)
    }
}

kiwifetch()

