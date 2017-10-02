var App = {
    initialize: function() {
        this.host = window.location.host;

        this.set_body_class();
        this.init_github();
        this.init_huboard();
        this.init_jira();
        this.init_slack();
    },
    set_body_class: function() {
        $("body").addClass(this.host.substring(0, this.host.indexOf(".com")));
    },
    init_github: function() {
        this.toggle_images();
        this.link_out();
        this.test_this_please();
    },
    toggle_images: function() {
        $(".comment-body img:not('.toggled'):not('.emoji')").hide().addClass("toggled")
            .before($("<a href='#' style='display:block;'>Toggle image</a>").click(function() {
                    $(this).next().toggle();
                    return false;
                })
            );
    },
    link_out: function(force_all) {
        force_all = default_for(force_all, false);
        $(".comment-body a").filter(function() {
                if (force_all) {
                    return true;
                }

                return $(this).not('.issue-link');
            }).attr("target", "_blank");
    },
    test_this_please: function() {
        var new_comment_form_actions = $("#partial-new-comment-form-actions");
        var button = $("<button>").addClass("btn").text("Test Again");
        button.click(function() {
            $("#new_comment_field").val("test this please");
            new_comment_form_actions.find("btn-primary").click();
        });
        new_comment_form_actions.append(button);
    },
    init_huboard: function() {
        $(document).on('DOMNodeInserted', function(e) {
            if ($(e.target).find(".comment-body").length > 0) {
                App.toggle_images();
                App.link_out(true);
            }

            // Highlight tickets with [?] in the title
            if ($(e.target).find(".card").length) {
                $(".column:not(:first) .title:contains('[?]')").closest(".card").css({ borderWidth: "2px", borderColor: "red" });
                $(".column:not(:first) .title").filter(function() {
                        return !$(this).text().match(/\[.*\]/);
                    }).closest(".card").css({ borderWidth: "2px", borderColor: "red" });
            }
        });
    },
    init_jira: function() {
        // open ticket in new window when clicking on board instead of opening tab
        $(document).on('click', '.ghx-key a', function(event) {
            window.location = $(this).prop('href');
            event.preventDefault();
        });

        // hide the detail tab on the right
        $(".ghx-detail-close span").click();
    },
    init_slack: function() {
        function add_apollo_links() {
            if (!$("body").hasClass("loading")) {
                 var channelName = $(".name").text();
                 if (channelName == "apollo" && !$('.custom-links').length) {
                    var links = '<span class="custom-links">' +
                                '<a target="_blank" href="https://jira.rnl.io/secure/RapidBoard.jspa?rapidView=10&useStoredSettings=true">Jira</a> ' +
                                '<a target="_blank" href="https://app.honeybadger.io/projects/45429/faults?q=-is%3Aresolved+-is%3Aignored+environment%3Acubesmart&sort=last_seen_desc">HB-FMS</a> ' +
                                '<a target="_blank" href="https://app.honeybadger.io/projects/45399/faults?q=-is%3Aresolved+-is%3Aignored+environment%3Acubesmart&sort=last_seen_desc">HB-SESC</a> ' +
                                '<a target="_blank" href="https://github.com/rednovalabs/fms">GH-FMS</a> ' +
                                '<a target="_blank" href="https://github.com/rednovalabs/fms">GH-SESC</a> ' +
                                '<a target="_blank" href="https://store.cms.cubesmart.com/sidekiq/">Sidekiq</a> ' +
                                '<a target="_blank" href="https://store.cms.cubesmart.com/lazarus/carves">Carve</a> ' +
                                '<a target="_blank" href="http://goo.gl/XYB6fc">Hangout</a>' +
                                '</span>';
                     $("#channel_actions").after(links);
                 }

                 if (channelName) {
                     clearInterval(loadingInterval);
                 }
            }
        }

        var loadingInterval = setInterval(function() {
            add_apollo_links();
        }, 250);

        $('body').on('DOMSubtreeModified', '#active_channel_name', function() {
            add_apollo_links();
        });
    }
};

$(function() {
    App.initialize();
});

function default_for(arg, val) {
    return typeof arg !== 'undefined' ? arg : val;
}
