const { default: apiConfig } = require('@constants/apiConfig');
const { useEffect } = require('react');
const { default: useFetch } = require('./useFetch');

const ruleTypes = {
    task_rule_read_article: 'articles',
    task_rule_watch_video: 'videos',
    task_rule_read_infographic: 'infographics',
    task_rule_play_game: 'games',
};

export default function useAssignedTraining(telemetryId) {
    const { execute, loading, data } = useFetch(apiConfig.telemetry.assignTraining.getList, {
        immediate: false,
        mappingData: ({ data }) => {
            const dataDetail = {};

            data.data.rules.forEach((item) => {
                if (dataDetail[ruleTypes[item.type]] == null) {
                    dataDetail[ruleTypes[item.type]] = [];
                }

                if (item.refObject) {
                    dataDetail[ruleTypes[item.type]].push(item.refObject);
                }
            });

            return dataDetail;
        },
    });

    function executeGetAssignedTraining() {
        execute({
            pathParams: {
                id: telemetryId,
            },
        });
    }

    useEffect(() => {
        if (!telemetryId) return;

        executeGetAssignedTraining();
    }, [ telemetryId ]);

    return { data, loading, executeGetAssignedTraining };
}
