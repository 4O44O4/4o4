function gravitySystem() {
    if (typeof cr_getC2Runtime !== "undefined") {
        var runtime = cr_getC2Runtime();
        var player = null;

        // Search for the player by the image name you found
        for (var name in runtime.types) {
            var t = runtime.types[name];
            if (t.texture_file && t.texture_file.includes("player-sheet0.png")) {
                player = t.instances[0];
                break;
            }
        }

        if (player && player.behavior && player.behavior.Platform) {
            var p = player.behavior.Platform;
            var margin = 20; // Increased sensitivity

            // 1. Flip UP when hitting the CEILING
            if (player.y <= margin && p.g > 0) {
                p.g = -Math.abs(p.g);
            }

            // 2. Flip DOWN when hitting the FLOOR
            if (player.y >= (runtime.height - (player.height + margin)) && p.g < 0) {
                p.g = Math.abs(p.g);
            }

            // 3. Flip direction when hitting SIDE WALLS
            if (player.x <= margin || player.x >= (runtime.width - (player.width + margin))) {
                // Check if we just hit the wall to prevent "stuck" vibrating
                if (!player.lastWallHit) {
                    p.g *= -1; 
                    player.lastWallHit = true;
                    
                    // Bounce away slightly to clear the margin
                    if (player.x <= margin) player.x = margin + 5;
                    else player.x = runtime.width - (player.width + margin + 5);
                }
            } else {
                player.lastWallHit = false;
            }
        }
    }
}

// Run this as fast as possible
setInterval(gravitySystem, 10);
