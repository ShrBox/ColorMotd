/*
    ColorMotd
    Author: ShrBox
    License: MIT License
*/
let Interval = 5000;
let Motd = ["§aWelcome to our server", "§cPowered by LiteLoaderBDS", "§6That's cool!"];
let CurrentMotd = 0;

InitPlugin()

function InitConfig() {
    let config = new JsonConfigFile("plugins/ColorMotd/config.json");
    const conf_interval = config.get("interval");
    if (!conf_interval) {
        config.set("interval", 5000);
    } else {
        Interval = conf_interval;
    }
    const conf_motd = config.get("motd");
    if (!conf_motd) {
        config.set("motd", ["§aWelcome to our server", "§cPowered by LiteLoaderBDS", "§6That's cool!"]);
    } else {
        Motd = conf_motd;
    }
}

function SwitchMotd() {
    if (CurrentMotd < Motd.length) {
        mc.setMotd(Motd[CurrentMotd]);
        ++CurrentMotd;
    } else {
        mc.setMotd(Motd[0]);
        CurrentMotd = 1;
    }
}

function InitPlugin() {
    ll.registerPlugin("ColorMotd", "Timing change MOTD plugin", [1, 0, 0], { "Author": "ShrBox", "License": "MIT License", "Repository": "https://github.com/ShrBox/ColorMotd" })
    InitConfig();
    mc.listen("onServerStarted", function () {
        SwitchMotd();
        setInterval(SwitchMotd, Interval);
    });
    log("Loaded!");
}