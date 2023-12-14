$(document).ready(function () {
    // Start/Stop Capture
    $('#startCaptureBtn').click(function () {
        $.get('/start_capture', function (response) {
            // TODO: Handle the response, update UI if needed
        });
    });

    $('#stopCaptureBtn').click(function () {
        $.get('/stop_capture', function (response) {
            // TODO: Handle the response, update UI if needed
        });
    });

    // Search Packets
    $('#searchForm').submit(function (e) {
        e.preventDefault();
        let ipAddress = $('#ipAddress').val();
        let protocol = $('#protocol').val();
        let port = $('#port').val();

        $.ajax({
            type: 'POST',
            url: '/search_packets',
            data: {ipAddress, protocol, port},
            success: function (response) {
                // TODO: Handle the response, update packet table
            }
        });
    });

    // Function to add packet to table
    function addPacketToTable(packet) {
        let row = `<tr>
                        <td>${packet.num}</td>
                        <td>${packet.source_ip}</td>
                        <td>${packet.destination_ip}</td>
                        <td>${packet.protocol}</td>
                        <td>${packet.port}</td>
                        <td>${packet.port}</td>
                    </tr>`;
        $('#packetTable tbody').append(row);
    }

    // Function to update statistics chart
    function updateStatisticsChart(statistics) {
        let data = [{
            x: ['Packets'],
            y: [statistics.packets],
            type: 'bar'
        }];

        let layout = {
            title: 'Packet Statistics',
            xaxis: {
                title: 'Category'
            },
            yaxis: {
                title: 'Count'
            }
        };

        Plotly.newPlot('chart', data, layout);
    }

    // Dummy data for testing
    let packets = [
        {num: '1', source_ip: '192.168.1.1', destination_ip: '192.168.1.2', protocol: 'TCP', port: 80},
        {num: '2', source_ip: '192.168.1.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '3', source_ip: '192.168.1.5', destination_ip: '192.168.1.6', protocol: 'TCP', port: 443},
        {num: '4', source_ip: '192.168.88.2', destination_ip: '192.168.1.2', protocol: 'TCP', port: 80},
        {num: '5', source_ip: '192.168.88.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '6', source_ip: '192.168.1.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '7', source_ip: '192.168.1.5', destination_ip: '192.168.1.6', protocol: 'TCP', port: 443},
        {num: '8', source_ip: '192.168.88.2', destination_ip: '192.168.1.2', protocol: 'TCP', port: 80},
        {num: '9', source_ip: '192.168.88.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '10', source_ip: '192.168.1.1', destination_ip: '192.168.1.2', protocol: 'TCP', port: 80},
        {num: '11', source_ip: '192.168.1.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '12', source_ip: '192.168.1.5', destination_ip: '192.168.1.6', protocol: 'TCP', port: 443},
        {num: '13', source_ip: '192.168.88.2', destination_ip: '192.168.1.2', protocol: 'TCP', port: 80},
        {num: '14', source_ip: '192.168.88.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '15', source_ip: '192.168.1.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '16', source_ip: '192.168.1.5', destination_ip: '192.168.1.6', protocol: 'TCP', port: 443},
        {num: '17', source_ip: '192.168.88.2', destination_ip: '192.168.1.2', protocol: 'TCP', port: 80},
        {num: '18', source_ip: '192.168.88.3', destination_ip: '192.168.1.4', protocol: 'UDP', port: 53},
        {num: '19', source_ip: '192.168.88.5', destination_ip: '192.168.1.6', protocol: 'TCP', port: 443}
    ];

    let statistics = {
        packets: packets.length
    };

    // Add packets to table
    packets.forEach(packet => {
        addPacketToTable(packet);
    });

    // Update statistics chart
    updateStatisticsChart(statistics);

});

